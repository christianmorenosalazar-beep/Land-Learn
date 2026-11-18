class GestorPolling {
    constructor(msPorDefectoInactivo = 15000) {
        this.tareas = [];
        this.msPorDefectoInactivo = msPorDefectoInactivo;
        this._alCambiar = this._alCambiar.bind(this);
        document.addEventListener('visibilitychange', this._alCambiar);
        window.addEventListener('beforeunload', () => this.detenerTodo());
    }

    registrar(fn, msNormal, opciones) {
        opciones = opciones || {};
        const tarea = {
            fn: fn,
            msNormal: msNormal,
            msInactivo: opciones.msInactivo !== undefined ? opciones.msInactivo : this.msPorDefectoInactivo,
            pausarSiOculta: opciones.pausarSiOculta === true,
            id: null
        };
        this.tareas.push(tarea);
        this._programar(tarea, tarea.msNormal);
        return tarea;
    }

    _programar(tarea, ms) {
        if (tarea.id) { clearInterval(tarea.id); tarea.id = null; }
        if (ms > 0) tarea.id = setInterval(tarea.fn, ms);
    }

    _alCambiar() {
        const oculta = document.visibilityState === 'hidden';

        this.tareas.forEach(t => {
            if (oculta) {
                this._programar(t, t.pausarSiOculta ? 0 : t.msInactivo);
            } else {
                this._programar(t, t.msNormal);
            }
        });

        if (!oculta) {
            this.tareas.forEach(t => { try { t.fn(); } catch (e) { } });
        }
    }

    detenerTodo() {
        this.tareas.forEach(t => { if (t.id) clearInterval(t.id); t.id = null; });
        this.tareas = [];
        document.removeEventListener('visibilitychange', this._alCambiar);
    }
}

window.GestorPolling = GestorPolling;
