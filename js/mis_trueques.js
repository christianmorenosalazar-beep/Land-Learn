class GestorMisTrueques {
    constructor() {
        this.contenedor = document.getElementById('contenedor-mis-trueques');
    }

    iniciar() {
        this.cargar();
        document.addEventListener('click', e => {
            const btn = e.target.closest('.btn-evaluar-trueque');
            if (btn) this.abrirEvaluacion(btn.dataset.id, btn.dataset.pareja);
        });
    }

    async cargar() {
        if (!this.contenedor) return;
        try {
            const res = await fetch('php/get_mis_trueques.php');
            const lista = await res.json();

            if (lista.error) { this.contenedor.innerHTML = '<p>Inicia sesion para ver tus trueques.</p>'; return; }
            if (!lista.length) { this.contenedor.innerHTML = '<p>Aun no tienes trueques. Ve al Radar para proponer uno.</p>'; return; }

            this.contenedor.innerHTML = lista.map(t => {
                const colores = {
                    'Solicitado':  '#f59e0b',
                    'En Progreso': '#2ab5b9',
                    'Finalizado':  '#16a34a',
                    'Cancelado':   '#ef4444'
                };
                const color = colores[t.estado] || '#64748b';

                let acciones = '';
                if (t.estado === 'Solicitado') {
                    acciones = `<a href="chat_acuerdos.html?id=${t.id_intercambio}" style="color:#2ab5b9;font-weight:700;text-decoration:none;">💬 Acordar detalles</a>`;
                } else if (t.estado === 'En Progreso') {
                    acciones = `<a href="sala_trueque.html?id=${t.id_intercambio}" style="color:#2ab5b9;font-weight:700;text-decoration:none;">🎥 Entrar a la sala</a>
                                &nbsp;·&nbsp;
                                <button class="btn-evaluar-trueque" data-id="${t.id_intercambio}" data-pareja="${this.esc(t.nombre_pareja)}"
                                        style="background:none;border:none;color:#f59e0b;font-weight:700;cursor:pointer;font-family:inherit;font-size:inherit;">
                                    ⭐ Evaluar y cerrar
                                </button>`;
                } else if (t.estado === 'Finalizado') {
                    acciones = `<button class="btn-evaluar-trueque" data-id="${t.id_intercambio}" data-pareja="${this.esc(t.nombre_pareja)}"
                                        style="background:none;border:none;color:#16a34a;font-weight:700;cursor:pointer;font-family:inherit;font-size:inherit;">
                                    ⭐ Evaluar
                                </button>`;
                }

                return `
                <div style="background:white;border-radius:12px;padding:18px 22px;margin-bottom:14px;
                            box-shadow:0 4px 12px rgba(9,60,92,.06);border-left:5px solid ${color};">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <b style="color:#093c5c;font-size:1.05rem;">${this.esc(t.nombre_pareja)}</b>
                        <span style="background:${color};color:white;padding:3px 12px;border-radius:20px;font-size:.75rem;font-weight:700;">${t.estado}</span>
                    </div>
                    <p style="margin:4px 0;color:#64748b;font-size:.9rem;">
                        📤 Ofreces: <b>${this.esc(t.habilidad_ofrecida)}</b><br>
                        📥 Recibes: <b>${this.esc(t.habilidad_buscada)}</b>
                    </p>
                    <div style="margin-top:10px;font-size:.92rem;">${acciones}</div>
                </div>`;
            }).join('');

        } catch (e) {
            this.contenedor.innerHTML = '<p>Error al cargar los trueques.</p>';
        }
    }

    abrirEvaluacion(id, pareja) {
        const puntuacion = prompt(`Evalua tu trueque con ${pareja}\n\nDel 1 al 5, que tal estuvo?\n\n5 = Excelente (+50 XP al maestro)\n4 = Muy bueno (+40 XP)\n3 = Bueno (+30 XP)\n2 = Regular (+20 XP)\n1 = Necesita mejorar (+10 XP)`, '5');
        if (!puntuacion) return;

        const n = parseInt(puntuacion);
        if (isNaN(n) || n < 1 || n > 5) { alert('Escribe un numero del 1 al 5.'); return; }

        const comentario = prompt('Deja un comentario para tu companero (opcional):', '') || '';
        this.enviarEvaluacion(id, n, comentario);
    }

    async enviarEvaluacion(id, puntuacion, comentario) {
        const fd = new FormData();
        fd.append('id_intercambio', id);
        fd.append('puntuacion', puntuacion);
        fd.append('comentario', comentario);

        try {
            const res  = await fetch('php/evaluar_trueque.php', { method: 'POST', body: fd });
            const data = await res.json();

            if (data.success) {
                alert('🍄 ' + data.mensaje);
                this.cargar();
            } else {
                alert('Error: ' + (data.mensaje || 'Intenta de nuevo.'));
            }
        } catch (e) {
            alert('Error de conexion.');
        }
    }

    esc(s) {
        return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
                              .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
}

document.addEventListener('DOMContentLoaded', () => new GestorMisTrueques().iniciar());
