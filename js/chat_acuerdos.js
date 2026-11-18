class GestorChatAcuerdos {
    constructor() {
        const parametrosURL = new URLSearchParams(window.location.search);
        this.idIntercambio = parametrosURL.get('id');

        this.inputNuevaMeta = document.getElementById('txt-nueva-meta');
        this.btnAgregarMeta = document.getElementById('btn-agregar-meta');
        this.cajaTareasPendientes = document.getElementById('contenedor-tareas-pendientes');
        this.cajaTareasCompletadas = document.getElementById('contenedor-tareas-completadas');

        this.historialChat = document.getElementById('historial-texto');
        this.inputMensaje = document.getElementById('txt-mensaje');
        this.btnEnviarMsg = document.getElementById('btn-enviar-msg');

        this.btnGenerarCodigo = document.getElementById('btn-generar-codigo');
        this.btnEntrarSala = document.getElementById('btn-entrar-sala');

        this.ultimoNumeroMensajes = 0;
    }

    iniciar() {
        if (!this.idIntercambio) return;
        this.escucharEventos();

        this.cargarMensajes();
        this.cargarTareas();

        this.polling = new GestorPolling(15000);
        this.polling.registrar(() => this.cargarMensajes(), 2000);
        this.polling.registrar(() => this.cargarTareas(),   3000, { pausarSiOculta: true });
    }

    escucharEventos() {
        if (this.btnEnviarMsg) this.btnEnviarMsg.addEventListener('click', () => this.enviarMensaje());
        if (this.inputMensaje) this.inputMensaje.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.enviarMensaje(); });
        if (this.btnAgregarMeta) this.btnAgregarMeta.addEventListener('click', () => this.agregarMeta());

        if (this.btnGenerarCodigo) {
            this.btnGenerarCodigo.addEventListener('click', async () => {
                this.btnGenerarCodigo.disabled = true; 

                const fd = new FormData();
                fd.append('id_intercambio', this.idIntercambio);
                fd.append('accion', 'generar');
                const res = await fetch('php/gestionar_codigo.php', { method: 'POST', body: fd });
                const data = await res.json();

                if(data.success) {

                    document.getElementById('caja-codigo-sala').style.display = 'block';
                    document.getElementById('texto-codigo-sala').innerText = data.codigo;

                    if(this.inputMensaje) this.inputMensaje.value = `¡Lista la sala! Código de acceso: ${data.codigo}`;

                    this.btnGenerarCodigo.innerHTML = '<i class="fa-solid fa-check"></i> Código Listo';
                    this.btnGenerarCodigo.style.background = '#22c55e'; 
                    this.btnGenerarCodigo.style.cursor = 'default';
                } else {
                    this.btnGenerarCodigo.disabled = false;
                    alert("Error al generar el código");
                }
            });
        }

        if (this.btnEntrarSala) {
            this.btnEntrarSala.addEventListener('click', async () => {
                let codigoIngresado = prompt("🔑 Ingresa la llave de acceso a la Sala (ej. LRN-1234):");

                if (codigoIngresado) {
                    const fdVerify = new FormData();
                    fdVerify.append('id_intercambio', this.idIntercambio);
                    fdVerify.append('accion', 'verificar');
                    fdVerify.append('codigo', codigoIngresado);

                    const resV = await fetch('php/gestionar_codigo.php', { method: 'POST', body: fdVerify });
                    const dataV = await resV.json();

                    if(dataV.success) {

                        window.location.href = `sala_trueque.html?id=${this.idIntercambio}`;
                    } else {
                        alert("❌ Código incorrecto o aún no ha sido generado.");
                    }
                }
            });
        }
    }

    async cargarTareas() {
        try {
            const res = await fetch(`php/procesar_tareas.php?accion=leer&id_intercambio=${this.idIntercambio}`);
            const data = await res.json();

            if(data.error) return;

            let htmlPendientes = '';
            let htmlCompletadas = '';

            data.forEach(t => {
                if(t.completada == 1) {
                    htmlCompletadas += `
                    <div class="tarea-checkbox-item" style="opacity: 0.75; background: #f8fafc;">
                        <i class="fa-solid fa-square-check" style="color: #fbbf24; font-size: 1.1rem;"></i>
                        <span style="color: #64748b; font-size: 0.95rem; text-decoration: line-through;">${t.titulo_tarea}</span>
                    </div>`;
                } else {
                    htmlPendientes += `
                    <div class="tarea-checkbox-item">
                        <input type="checkbox" style="width: 18px; height: 18px; accent-color: #2ab5b9;" onchange="window.marcarTarea(${t.id_tarea})">
                        <span style="color: #334155; font-size: 0.95rem;">${t.titulo_tarea}</span>
                    </div>`;
                }
            });

            this.cajaTareasPendientes.innerHTML = htmlPendientes || '<p style="color:#94a3b8; font-size:0.9rem; text-align:center;">No hay metas pendientes.</p>';
            this.cajaTareasCompletadas.innerHTML = htmlCompletadas || '<p style="color:#94a3b8; font-size:0.9rem; text-align:center;">No hay metas completadas.</p>';
        } catch(e) {}
    }

    async agregarMeta() {
        const titulo = this.inputNuevaMeta.value.trim();
        if(!titulo) return;

        const fd = new FormData();
        fd.append('accion', 'crear');
        fd.append('id_intercambio', this.idIntercambio);
        fd.append('titulo', titulo);

        await fetch('php/procesar_tareas.php', { method: 'POST', body: fd });
        this.inputNuevaMeta.value = '';
        this.cargarTareas();
    }

    async completarTarea(idTarea) {
        const fd = new FormData();
        fd.append('accion', 'completar');
        fd.append('id_intercambio', this.idIntercambio);
        fd.append('id_tarea', idTarea);

        await fetch('php/procesar_tareas.php', { method: 'POST', body: fd });
        this.cargarTareas(); 
    }

    async cargarMensajes() {
        try {
            const res = await fetch(`php/get_mensajes.php?id=${this.idIntercambio}`);
            const data = await res.json();
            if (data.error) return;

            if (data.mensajes.length === 0) {
                this.historialChat.innerHTML = '<p style="text-align:center; color:#9ca3af; margin-top: 50%;">Sin mensajes aún.</p>';
                return;
            }

            let html = '';
            data.mensajes.forEach(msg => {
                const esMio = (msg.id_remitente == data.mi_id);
                html += `<div class="burbuja ${esMio ? 'mia' : 'otra'}">${msg.mensaje}</div>`;
            });

            this.historialChat.innerHTML = html;
            if (data.mensajes.length > this.ultimoNumeroMensajes) {
                this.historialChat.scrollTop = this.historialChat.scrollHeight;
                this.ultimoNumeroMensajes = data.mensajes.length;
            }
        } catch (e) {}
    }

    async enviarMensaje() {
        const texto = this.inputMensaje.value.trim();
        if (!texto) return;
        this.btnEnviarMsg.disabled = true;

        const fd = new FormData();
        fd.append('id_intercambio', this.idIntercambio);
        fd.append('mensaje', texto);

        await fetch('php/insert_mensaje.php', { method: 'POST', body: fd });

        this.inputMensaje.value = '';
        this.btnEnviarMsg.disabled = false;
        this.cargarMensajes();
        this.inputMensaje.focus();
    }
}

const appAcuerdos = new GestorChatAcuerdos();
document.addEventListener('DOMContentLoaded', () => appAcuerdos.iniciar());

window.marcarTarea = (id) => appAcuerdos.completarTarea(id);
