const MAPA = {
    "Diseño Web": {
        "HTML/CSS":          ["Semántica", "Flexbox", "Grid", "Animaciones CSS"],
        "JavaScript":        ["DOM", "Fetch API", "ES6+", "POO en JS"],
        "PHP":               ["Sesiones", "PDO / MySQLi", "APIs REST", "Seguridad"],
        "Frameworks CSS":    ["Bootstrap", "Tailwind", "Bulma"],
        "Accesibilidad Web": ["ARIA", "Contraste", "Navegación por teclado"]
    },
    "Mecánica": {
        "Motor":             ["Aceite y filtros", "Correa de distribución", "Carburador", "Inyección"],
        "Frenos":            ["Balatas", "Líquido de frenos", "Discos", "ABS"],
        "Suspensión":        ["Amortiguadores", "Rótulas", "Alineación y balanceo"],
        "Sistema Eléctrico": ["Batería", "Alternador", "Fusibles y relés"],
        "Transmisión":       ["Caja de cambios", "Diferencial", "Clutch"]
    },
    "Matemáticas": {
        "Álgebra":        ["Ecuaciones", "Factorización", "Funciones"],
        "Cálculo":        ["Derivadas", "Integrales", "Límites"],
        "Geometría":      ["Pitágoras", "Trigonometría", "Áreas y volúmenes"],
        "Probabilidad":   ["Combinatoria", "Distribuciones", "Estadística"],
        "Álgebra Lineal": ["Matrices", "Vectores", "Sistemas de ecuaciones"]
    },
    "Física": {
        "Mecánica Clásica": ["Leyes de Newton", "Cinemática", "Trabajo y energía"],
        "Electricidad":     ["Ley de Ohm", "Circuitos", "Campo eléctrico"],
        "Termodinámica":    ["1ra y 2da Ley", "Calor específico", "Ciclos"],
        "Óptica":           ["Reflexión", "Refracción", "Lentes"],
        "Ondas":            ["Sonido", "Efecto Doppler", "Interferencia"]
    },
    "Química": {
        "Química General": ["Tabla periódica", "Tipos de enlace", "Reacciones"],
        "Orgánica":        ["Hidrocarburos", "Grupos funcionales", "Polímeros"],
        "Estequiometría":  ["Mol", "Balanceo", "Rendimiento"],
        "Soluciones":      ["Concentración", "pH", "Solubilidad"],
        "Electroquímica":  ["Oxidación y reducción", "Celdas", "Corrosión"]
    },
    "Gastronomía": {
        "Técnicas de cocción":  ["Escalfar", "Estofar", "Freír", "Al vapor"],
        "Pastelería":           ["Masas", "Cremas", "Decoración"],
        "Carnes":               ["Puntos de cocción", "Marinadas", "Cortes"],
        "Salsas madres":        ["Bechamel", "Velouté", "Española", "Holandesa"],
        "Higiene alimentaria":  ["FIFO", "Temperatura segura", "Contaminación cruzada"]
    },
    "Diseño Gráfico": {
        "Fundamentos":      ["Color", "Composición", "Jerarquía visual"],
        "Tipografía":       ["Kerning", "Leading", "Familias tipográficas"],
        "Ilustración":      ["Vectores", "Trazados", "Ilustración digital"],
        "Identidad Visual": ["Logotipos", "Brandbook", "Paletas de color"],
        "UI/UX":            ["Wireframes", "Prototipos", "Usabilidad"]
    },
    "Herrería y Soldadura": {
        "Forja":                 ["Templado", "Recocido", "Doblado en caliente"],
        "Soldadura SMAW":        ["Tipos de electrodo", "Polaridad", "Cordones"],
        "MIG/MAG":               ["Gas protector", "Hilo de aporte", "Parámetros"],
        "Corte":                 ["Esmeril angular", "Plasma", "Oxiacetilénico"],
        "Seguridad Industrial":  ["EPP obligatorio", "Ventilación", "Prevención de incendios"]
    }
};

class GestorSalaTrueque {
    constructor() {
        this.idIntercambio = new URLSearchParams(window.location.search).get('id');

        this.lobbyContainer  = document.getElementById('lobby-container');
        this.panelAnfitrion  = document.getElementById('panel-anfitrion');
        this.configAnfitrion = document.getElementById('config-anfitrion');
        this.selCategoria    = document.getElementById('select-categoria');
        this.selHabilidad    = document.getElementById('select-habilidad-sala');
        this.selSubcategoria = document.getElementById('select-subcategoria');
        this.selTiempo       = document.getElementById('select-tiempo');
        this.btnIniciar      = document.getElementById('btn-iniciar-sala');
        this.msgEspera       = document.getElementById('msg-espera-invitado');
        this.resumenHost     = document.getElementById('resumen-host-nombre');
        this.resumenGuest    = document.getElementById('resumen-guest-nombre');
        this.resumenTema     = document.getElementById('resumen-tema-txt');

        this.salaContainer  = document.getElementById('sala-container');
        this.textoContexto  = document.getElementById('texto-contexto-sala');
        this.listaConceptos = document.getElementById('lista-conceptos-contexto');
        this.videoGrid      = document.getElementById('video-grid-container');
        this.cajaMensajes   = document.getElementById('caja-mensajes-sala');
        this.inputMensaje   = document.getElementById('txt-mensaje-sala');
        this.btnEnviar      = document.getElementById('btn-enviar-sala');

        this.btnSalir       = document.getElementById('btn-salir-sala');
        this.btnSidebarExit = document.getElementById('btn-sidebar-exit');
        this.modalEval      = document.getElementById('modal-evaluacion');
        this.formEval       = document.getElementById('form-evaluacion');

        this.miId       = null;
        this.miNombre   = '';
        this.esEmisor   = false;
        this.cupos      = 2;
        this.tema       = { categoria: '', habilidad: '', enfoque: '' };
        this.ultimoTotalMensajes = 0;
        this.enSala     = false;
        this._timers    = [];
    }

    iniciar() {
        if (!this.idIntercambio) {
            alert("No se especificó un ID de intercambio válido.");
            window.location.href = 'dashboard.html';
            return;
        }
        this.llenarCategorias();
        this.vincularEventos();
        this.cargarDatosLobby();
    }

    llenarCategorias() {
        if (!this.selCategoria) return;
        let html = '<option value="" disabled selected>Selecciona una categoría...</option>';
        Object.keys(MAPA).forEach(cat => { html += `<option value="${cat}">${cat}</option>`; });
        this.selCategoria.innerHTML = html;
    }

    onCategoriaChange() {
        const cat = this.selCategoria.value;
        this.tema = { categoria: cat, habilidad: '', enfoque: '' };

        let html = '<option value="" disabled selected>Elige una habilidad...</option>';
        Object.keys(MAPA[cat] || {}).forEach(h => { html += `<option value="${h}">${h}</option>`; });
        this.selHabilidad.innerHTML = html;
        this.selHabilidad.disabled  = false;

        this.selSubcategoria.innerHTML = '<option value="" disabled selected>Primero elige una habilidad...</option>';
        this.selSubcategoria.disabled  = true;

        this.actualizarResumen();
    }

    onHabilidadChange() {
        const cat = this.selCategoria.value;
        const hab = this.selHabilidad.value;
        this.tema.habilidad = hab;
        this.tema.enfoque   = '';

        const enfoques = (MAPA[cat] && MAPA[cat][hab]) || [];
        let html = '<option value="" disabled selected>Elige un enfoque...</option>';
        enfoques.forEach(e => { html += `<option value="${e}">${e}</option>`; });
        this.selSubcategoria.innerHTML = html;
        this.selSubcategoria.disabled  = false;

        this.actualizarResumen();
    }

    onEnfoqueChange() {
        this.tema.enfoque = this.selSubcategoria.value;
        this.actualizarResumen();
    }

    actualizarResumen() {
        if (!this.resumenTema) return;
        const { categoria, habilidad, enfoque } = this.tema;

        if (!categoria) {
            this.resumenTema.innerHTML = 'Selecciona una habilidad para visualizar el temario de la sesión.';
            return;
        }

        const tiempo = this.selTiempo?.value || '45';
        this.resumenTema.innerHTML = `
            <strong style="color:#2ab5b9;">📋 Temario de hoy</strong><br>
            📚 Categoría: <strong>${categoria}</strong><br>
            ${habilidad ? `🎯 Habilidad: <strong>${habilidad}</strong><br>` : ''}
            ${enfoque   ? `🔍 Enfoque: <strong>${enfoque}</strong><br>`   : ''}
            👥 Cupos: <strong>${this.cupos} personas</strong><br>
            ⏱ Duración: <strong>${tiempo == 0 ? 'Sin límite' : tiempo + ' minutos'}</strong>
        `;
    }

    seleccionarCupos(n) {
        this.cupos = n;
        document.querySelectorAll('.cupo-card').forEach(c => c.classList.remove('activo'));
        document.getElementById(`cupo-${n}`)?.classList.add('activo');
        this.actualizarResumen();
    }

    vincularEventos() {
        this.selCategoria   ?.addEventListener('change', () => this.onCategoriaChange());
        this.selHabilidad   ?.addEventListener('change', () => this.onHabilidadChange());
        this.selSubcategoria?.addEventListener('change', () => this.onEnfoqueChange());
        this.selTiempo      ?.addEventListener('change', () => this.actualizarResumen());

        document.querySelectorAll('.cupo-card').forEach(card => {
            card.addEventListener('click', () => {
                this.seleccionarCupos(parseInt(card.dataset.cupos));
            });
        });

        this.btnIniciar?.addEventListener('click', () => this.abrirSalaDesdeHost());
        this.btnEnviar ?.addEventListener('click', () => this.enviarMensaje());
        this.inputMensaje?.addEventListener('keypress', e => {
            if (e.key === 'Enter') this.enviarMensaje();
        });

        const abrirModal = () => { if (this.modalEval) this.modalEval.style.display = 'flex'; };
        this.btnSalir      ?.addEventListener('click', abrirModal);
        this.btnSidebarExit?.addEventListener('click', abrirModal);

        this.formEval?.addEventListener('submit', e => this.procesarEvaluacion(e));

        window.addEventListener('beforeunload', () => {
            if (!this.enSala) return;
            const carga = new URLSearchParams({
                id_intercambio: this.idIntercambio,
                accion: 'salir'
            });
            if (window.tokenCSRF) carga.append('csrf_token', window.tokenCSRF());
            navigator.sendBeacon?.('php/presencia_sala.php', carga);
        });
    }

    async cargarDatosLobby() {
        try {
            const res  = await fetch(`php/get_info_sala.php?id=${this.idIntercambio}`);
            const data = await res.json();

            if (data.error) { console.error("Error sala:", data.error); return; }

            this.miId     = data.mi_id;
            this.esEmisor = (String(data.mi_id) === String(data.id_emisor));
            this.miNombre = this.esEmisor ? data.nombre_emisor : data.nombre_receptor;

            if (this.resumenHost)  this.resumenHost.innerText  = data.nombre_emisor   || '---';
            if (this.resumenGuest) this.resumenGuest.innerText = data.nombre_receptor || '---';

            if (parseInt(data.id_estado) >= 2) {
                this.entrarASalaActiva(data);
                return;
            }

            if (this.esEmisor) {
                if (this.panelAnfitrion)  this.panelAnfitrion.style.display  = 'block';
                if (this.configAnfitrion) this.configAnfitrion.style.display = 'block';
                if (this.btnIniciar)      this.btnIniciar.style.display      = 'block';
            } else {
                if (this.msgEspera) this.msgEspera.style.display = 'block';
                this.iniciarPollingLobby();
            }

        } catch (e) {
            console.error("Error cargando el lobby:", e);
        }
    }

    async abrirSalaDesdeHost() {
        if (!this.tema.categoria) { alert("📚 Selecciona una categoría."); return; }
        if (!this.tema.habilidad) { alert("🎯 Selecciona la habilidad específica."); return; }
        if (!this.tema.enfoque)   { alert("🔍 Selecciona el enfoque de la sesión."); return; }

        this.btnIniciar.disabled  = true;
        this.btnIniciar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Abriendo sala...';

        const fd = new FormData();
        fd.append('id_intercambio', this.idIntercambio);
        fd.append('categoria',      this.tema.categoria);
        fd.append('habilidad',      this.tema.habilidad);
        fd.append('enfoque',        this.tema.enfoque);
        fd.append('cupos',          this.cupos);
        fd.append('tiempo_limite',  this.selTiempo?.value || 45);

        try {
            const res  = await fetch('php/guardar_tema_sala.php', { method: 'POST', body: fd });
            const data = await res.json();

            if (data.success) {
                this.cargarDatosLobby();
            } else {
                this.btnIniciar.disabled  = false;
                this.btnIniciar.innerHTML = '<i class="fa-solid fa-door-open"></i> Abrir Sala de Trueque';
                alert("Error al abrir la sala: " + (data.mensaje || "intenta de nuevo"));
            }
        } catch (e) {
            this.btnIniciar.disabled  = false;
            this.btnIniciar.innerHTML = '<i class="fa-solid fa-door-open"></i> Abrir Sala de Trueque';
        }
    }

    iniciarPollingLobby() {
        if (!this.pollingLobby) this.pollingLobby = new GestorPolling(10000);
        const revisar = async () => {
            try {
                const res  = await fetch(`php/get_info_sala.php?id=${this.idIntercambio}`);
                const data = await res.json();
                if (parseInt(data.id_estado) >= 2) {
                    this.pollingLobby.detenerTodo();
                    this.entrarASalaActiva(data);
                }
            } catch (e) {}
        };
        this.pollingLobby.registrar(revisar, 2500);
    }

    entrarASalaActiva(data) {
        this.enSala = true;
        if (this.lobbyContainer) this.lobbyContainer.style.display = 'none';
        if (this.salaContainer)  this.salaContainer.style.display  = 'flex';

        this.cupos = parseInt(data.cupos) || 2;

        const cat = data.categoria_sala || data.habilidad_ofrecida || 'Intercambio';
        const hab = data.habilidad_sala || '';
        const enf = data.enfoque_sala   || '';

        if (this.textoContexto) {
            const verbo = this.esEmisor ? '🎓 Hoy estás enseñando' : '🧠 Hoy estás aprendiendo';
            this.textoContexto.innerHTML =
                `${verbo}: <b style="color:#2ab5b9;">${cat}</b>` +
                (hab ? ` › <b>${hab}</b>` : '');
        }
        if (this.listaConceptos) {
            this.listaConceptos.innerText = enf ? `Enfoque: ${enf} · Sala de ${this.cupos} personas` : '';
        }

        this.marcarPresencia();
        this.actualizarParticipantes();
        this.cargarMensajesChat();

        this.polling = new GestorPolling(15000);
        this.polling.registrar(() => this.marcarPresencia(),         5000, { msInactivo: 12000 });
        this.polling.registrar(() => this.actualizarParticipantes(), 4000);
        this.polling.registrar(() => this.cargarMensajesChat(),      2000);
        this.polling.registrar(() => this.verificarCierreSala(),     3000);
    }

    async marcarPresencia() {
        try {
            const fd = new FormData();
            fd.append('id_intercambio', this.idIntercambio);
            fd.append('accion', 'ping');
            await fetch('php/presencia_sala.php', { method: 'POST', body: fd });
        } catch (e) {}
    }

    async actualizarParticipantes() {
        try {
            const res  = await fetch(`php/presencia_sala.php?id=${this.idIntercambio}`);
            const data = await res.json();
            if (!data.participantes) return;

            let html = '';

            data.participantes.forEach(p => {
                const soyYo   = (String(p.id_usuario) === String(this.miId));
                const rolIcon = p.es_anfitrion ? 'fa-user-graduate' : 'fa-user';
                const rolTxt  = p.es_anfitrion ? 'Anfitrión' : 'Invitado';
                html += `
                    <div class="video-box ${soyYo ? 'yo' : ''}">
                        <div class="video-avatar-placeholder">
                            <i class="fa-solid ${rolIcon}"></i>
                        </div>
                        <span class="participant-badge">
                            ${p.nombre}${soyYo ? ' (Tú)' : ''} — ${rolTxt}
                        </span>
                    </div>`;
            });

            const vacantes = this.cupos - data.participantes.length;
            for (let i = 0; i < vacantes; i++) {
                html += `
                    <div class="video-box vacante">
                        <div class="video-avatar-placeholder">
                            <i class="fa-solid fa-user-plus"></i>
                        </div>
                        <span class="participant-badge">Esperando participante...</span>
                    </div>`;
            }

            if (this.videoGrid) this.videoGrid.innerHTML = html;

        } catch (e) {}
    }

    async cargarMensajesChat() {
        try {
            const res  = await fetch(`php/get_mensajes_sala.php?id=${this.idIntercambio}`);
            const data = await res.json();
            if (!data.mensajes) return;

            let html = '';
            data.mensajes.forEach(m => {
                const esMio = (String(m.id_remitente) === String(this.miId));
                html += `
                    <div class="msg-box ${esMio ? 'me' : ''}">
                        <div class="msg-sender">${esMio ? 'Tú' : m.nombre_remitente}</div>
                        <div class="msg-body">${m.mensaje}</div>
                    </div>`;
            });

            if (this.cajaMensajes) {
                this.cajaMensajes.innerHTML = html;
                if (data.mensajes.length > this.ultimoTotalMensajes) {
                    this.cajaMensajes.scrollTop = this.cajaMensajes.scrollHeight;
                    this.ultimoTotalMensajes = data.mensajes.length;
                }
            }
        } catch (e) {}
    }

    async enviarMensaje() {
        const txt = this.inputMensaje?.value.trim();
        if (!txt) return;

        this.btnEnviar.disabled = true;
        const fd = new FormData();
        fd.append('id_intercambio', this.idIntercambio);
        fd.append('mensaje', txt);

        await fetch('php/insert_mensaje_sala.php', { method: 'POST', body: fd });

        this.inputMensaje.value = '';
        this.btnEnviar.disabled = false;
        this.cargarMensajesChat();
        this.inputMensaje.focus();
    }

    async verificarCierreSala() {
        try {
            const res  = await fetch(`php/check_estado_sala.php?id=${this.idIntercambio}`);
            const data = await res.json();

            if (parseInt(data.id_estado) === 3 && this.modalEval?.style.display !== 'flex') {
                if (this.polling) this.polling.detenerTodo();
                this.modalEval.style.display = 'flex';
            }
        } catch (e) {}
    }

    async procesarEvaluacion(e) {
        e.preventDefault();
        const btn = this.formEval.querySelector('button[type="submit"]');
        btn.disabled  = true;
        btn.innerText = 'Enviando...';

        const fd = new FormData(this.formEval);
        fd.append('id_intercambio', this.idIntercambio);

        try {
            const res  = await fetch('php/evaluar_trueque.php', { method: 'POST', body: fd });
            const data = await res.json();
            alert(data.success
                ? '🍄 ' + (data.mensaje || '¡Evaluación enviada! XP otorgada.')
                : 'Error: ' + (data.mensaje || 'Intenta de nuevo.'));
        } catch (e) {
            alert('¡Evaluación enviada! Volviendo al radar.');
        }

        this.enSala = false;
        window.location.href = 'dashboard.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GestorSalaTrueque().iniciar();
});
