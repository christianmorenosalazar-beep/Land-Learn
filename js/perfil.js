class GestorPerfil {
    constructor() {
        this.tabs        = document.querySelectorAll('.tab-btn');
        this.contenidos  = document.querySelectorAll('.tab-content');
        this.chats       = document.getElementById('lista-chats-activos');
        this.modal       = document.getElementById('modal-editar-perfil');
        this.form        = document.getElementById('form-editar-perfil');
        this.datos       = {};
    }

    iniciar() {
        this.iniciarTabs();
        this.iniciarModal();
        this.cargarPerfil();
        this.cargarProgreso();
        this.cargarChats();
    }

    iniciarTabs() {
        this.tabs.forEach(b => b.addEventListener('click', e => {
            this.tabs.forEach(x => x.classList.remove('active'));
            this.contenidos.forEach(x => x.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.getElementById(e.currentTarget.dataset.target)?.classList.add('active');
        }));
    }

    iniciarModal() {
        const abrir  = document.getElementById('btn-abrir-editar-perfil');
        const cerrarX = document.getElementById('btn-cerrar-modal-x');
        const cancel = document.getElementById('btn-cancelar-modal');
        if (!this.modal) return;

        abrir?.addEventListener('click', () => {
            document.getElementById('edit-biografia').value      = this.datos.biografia || '';
            document.getElementById('edit-disponibilidad').value  = this.datos.disponibilidad || '';
            document.getElementById('edit-match-ideal').value      = this.datos.match_ideal || '';
            this.modal.style.display = 'flex';
        });

        const cerrar = () => { this.modal.style.display = 'none'; };
        cerrarX?.addEventListener('click', cerrar);
        cancel ?.addEventListener('click', cerrar);
        this.modal.addEventListener('click', e => { if (e.target === this.modal) cerrar(); });

        this.form?.addEventListener('submit', e => this.guardarPerfil(e));
    }

    async guardarPerfil(e) {
        e.preventDefault();
        const btn = document.getElementById('btn-guardar-perfil');
        btn.disabled  = true;
        btn.innerText = 'Guardando...';

        try {
            const res  = await fetch('php/actualizar_perfil.php', {
                method: 'POST', body: new FormData(this.form)
            });
            const data = await res.json();

            if (data.success) {
                this.modal.style.display = 'none';
                await this.cargarPerfil();
                await this.cargarProgreso();
            } else {
                alert('Error: ' + (data.mensaje || 'Intenta de nuevo.'));
            }
        } catch {
            alert('Error de conexion al guardar el perfil.');
        }

        btn.disabled  = false;
        btn.innerText = 'Guardar Cambios';
    }

    async cargarPerfil() {
        try {
            const res  = await fetch('php/get_perfil.php');
            const data = await res.json();
            if (data.error) return;
            this.datos = data;

            const nombre = document.getElementById('nombre-usuario');
            if (nombre) nombre.textContent = `${data.nombre} ${data.apellido_paterno || ''}`.trim();

            const titulo = document.getElementById('titulo-usuario');
            if (titulo) titulo.textContent = `Rango Micologico: ${data.nivel_actual || 'Espora'}`;

            const foto = document.getElementById('foto-usuario');
            if (foto && data.foto_perfil) foto.src = data.foto_perfil;

            const bio = document.getElementById('biografia-usuario');
            if (bio) {
                const txt = data.biografia || 'Aun no has escrito tu biografia.';
                const primero = bio.firstChild;
                if (primero && primero.nodeType === Node.TEXT_NODE) primero.textContent = txt + ' ';
                else bio.insertBefore(document.createTextNode(txt + ' '), bio.firstChild);
            }

            const habs = document.getElementById('lista-habilidades');
            if (habs) {
                habs.innerHTML = data.disponibilidad
                    ? data.disponibilidad.split(',').map(h =>
                        `<li class="habilidad-item">💎 ${this.esc(h.trim())}</li>`).join('')
                    : '<li class="habilidad-item" style="color:#9ca3af;font-style:italic;">Sin habilidades registradas.</li>';
            }

            const busca = document.getElementById('lista-busquedas');
            if (busca) {
                busca.innerHTML = data.match_ideal
                    ? data.match_ideal.split(',').map(t =>
                        `<span class="tag-busqueda">🎯 ${this.esc(t.trim())}</span>`).join('')
                    : '<span class="tag-busqueda" style="color:#9ca3af;font-style:italic;">Sin intereses registrados.</span>';
            }
        } catch (e) {}
    }

    async cargarProgreso() {
        try {
            const res  = await fetch('php/get_perfil_progreso.php');
            const data = await res.json();
            if (data.error) return;

            const rango = document.getElementById('txt-rango-nivel');
            if (rango) rango.textContent = `Nivel: ${data.rango}`;

            const xp = document.getElementById('txt-xp-numerico');
            if (xp) xp.textContent = `${data.xp_actual} / ${data.xp_max} XP`;

            const barra = document.getElementById('progreso-xp');
            if (barra) barra.style.width = data.porcentaje + '%';

            const badge = document.getElementById('rango-usuario');
            if (badge) badge.textContent = data.rango;


            const cert = document.getElementById('contenedor-certificaciones');
            if (cert) {
                if (!data.certificaciones?.length) {
                    cert.innerHTML = '<p style="color:#9ca3af;font-size:.88rem;font-style:italic;">Aun no tienes habilidades certificadas. <a href="Evaluacion_Usu.html" style="color:#2ab5b9;font-weight:700;">Presenta el examen</a></p>';
                } else {
                    cert.innerHTML = data.certificaciones.map(c => {
                        const f = new Date(c.fecha_certificacion).toLocaleDateString('es-MX');
                        return `<div style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #f59e0b;border-radius:20px;padding:7px 15px;margin:4px 6px 4px 0;">
                            <span style="font-size:1.1rem;">🏆</span>
                            <div>
                                <div style="font-weight:700;color:#92400e;font-size:.85rem;">${this.esc(c.topico)}</div>
                                <div style="color:#b45309;font-size:.72rem;">${c.puntaje}/15 · ${f}</div>
                            </div>
                        </div>`;
                    }).join('');
                }
            }

            const hist = document.getElementById('contenedor-historial-calificaciones');
            if (hist) {
                if (!data.historial?.length) {
                    hist.innerHTML = '<p style="color:#9ca3af;font-size:.9rem;font-style:italic;text-align:center;padding:20px 0;">Aun no tienes evaluaciones recibidas.</p>';
                } else {
                    hist.innerHTML = data.historial.map(h => {
                        const est = '⭐'.repeat(h.puntuacion) + '☆'.repeat(5 - h.puntuacion);
                        const f   = new Date(h.fecha_calificacion).toLocaleDateString('es-MX');
                        return `<div style="background:#f8fafc;border-radius:10px;padding:14px 18px;margin-bottom:12px;border-left:4px solid #2ab5b9;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <span style="font-weight:700;color:#093c5c;">${this.esc(h.nombre_companero)}</span>
                                <span>${est}</span>
                            </div>
                            <p style="margin:2px 0;color:#64748b;font-size:.88rem;">📚 ${this.esc(h.habilidad_ofrecida)}</p>
                            ${h.comentario ? `<p style="margin:6px 0 2px;color:#475569;font-size:.87rem;font-style:italic;">"${this.esc(h.comentario)}"</p>` : ''}
                            <p style="margin:4px 0 0;color:#94a3b8;font-size:.78rem;">${f}</p>
                        </div>`;
                    }).join('');
                }
            }
        } catch (e) {}
    }

    async cargarChats() {
        if (!this.chats) return;
        try {
            const res   = await fetch('php/get_mis_chats.php');
            const chats = await res.json();
            if (chats.error || !chats.length) return;

            this.chats.innerHTML = chats.map(c => `
                <div style="background:white;padding:20px;border-radius:12px;margin-bottom:15px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 4px 10px rgba(0,0,0,.05);border-left:5px solid #2ab5b9;">
                    <div>
                        <h4 style="margin:0;color:#093c5c;font-size:1.15rem;">Trueque activo con ${this.esc(c.nombre_pareja)} 🎉</h4>
                        <p style="margin:5px 0 0;color:#64748b;font-size:.93rem;">Tema: <b>${this.esc(c.habilidad_intercambio)}</b></p>
                    </div>
                    <button style="background:#2ab5b9;color:white;padding:10px 20px;border:none;border-radius:8px;font-weight:bold;cursor:pointer;"
                            onclick="window.location.href='chat_acuerdos.html?id=${c.id_intercambio}'">
                        <i class="fa-solid fa-comments"></i> Hablar
                    </button>
                </div>`).join('');
        } catch (e) {}
    }

    esc(s) {
        return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
                              .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
}

document.addEventListener('DOMContentLoaded', () => new GestorPerfil().iniciar());
