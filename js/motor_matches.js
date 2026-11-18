class MotorMatchesController {
    constructor() {
        this.contenedor = document.getElementById('contenedor-resultados');

        const params  = new URLSearchParams(window.location.search);
        this.ofrezco  = params.get('habilidad_ofrecida') || '';
        this.busco    = params.get('habilidad_buscada')  || '';

        const textoB = document.getElementById('texto-busqueda');
        if (textoB && this.ofrezco && this.busco) {
            textoB.innerHTML = `Enseñas <b style="color:#2ab5b9;">${this.ofrezco}</b> · Quieres aprender <b style="color:#093c5c;">${this.busco}</b>`;
        }

        this.ejecutarMotor();
        this.contenedor.addEventListener('submit', e => this.procesarPropuesta(e));
    }

    async ejecutarMotor() {
        try {
            const response = await fetch(`php/motor_matches.php?ofrezco=${encodeURIComponent(this.ofrezco)}&busco=${encodeURIComponent(this.busco)}`);
            const usuarios = await response.json();

            if (usuarios.error) { window.location.href = 'index2.html'; return; }

            if (usuarios.length === 0) {
                this.contenedor.innerHTML = `
                    <div style="grid-column:1/-1; background:white; padding:3rem; border-radius:15px; text-align:center; color:#64748b; border:1px dashed #d1e9ea;">
                        <i class="fa-solid fa-satellite-dish" style="font-size:3rem; color:#cbd5e1; margin-bottom:1rem;"></i>
                        <p style="font-size:1.1rem; margin:0; color:#093c5c; font-weight:bold;">No hay nodos activos en la red.</p>
                        <p>Sé el primero en ofrecer tu conocimiento.</p>
                    </div>`;
                return;
            }

            let htmlCards = '';
            usuarios.forEach(user => {
                const rango    = user.nivel_actual    || 'Espora';
                const apellido = user.apellido_paterno|| '';
                const ofrece   = user.disponibilidad  || 'Múltiples habilidades';
                const busca    = user.match_ideal      || 'Conocimiento general';

                htmlCards += `
                <div style="background:#ffffff; border:1px solid #d1e9ea; border-radius:20px; padding:30px;
                            box-shadow:0 10px 30px rgba(9,60,92,0.05); text-align:center;
                            transition:transform .3s,box-shadow .3s;"
                     onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 15px 35px rgba(42,181,185,0.15)'"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(9,60,92,0.05)'">

                    <div style="width:80px;height:80px;background:#f0fafb;border-radius:50%;margin:0 auto 15px;
                                border:2px solid #2ab5b9;display:flex;align-items:center;justify-content:center;
                                font-size:2.5rem;color:#2ab5b9;">
                        <i class="fa-solid fa-user-astronaut"></i>
                    </div>

                    <h3 style="margin:0;font-family:'Poppins',sans-serif;color:#093c5c;font-size:1.3rem;">
                        ${user.nombre} ${apellido}
                    </h3>
                    <p style="color:#2ab5b9;font-weight:700;font-size:.9rem;margin-top:5px;">Nivel: ${rango}</p>
                    ${user.puntaje_match > 0 ? `<div style="display:inline-block;background:${user.es_match_ideal?'#16a34a':'#2ab5b9'};color:#fff;padding:3px 12px;border-radius:20px;font-size:.75rem;font-weight:700;margin-top:6px;">${user.es_match_ideal?'✨ Match Ideal':'🔗 '+user.puntaje_match+'% compatible'}</div>` : ''}

                    <div style="margin:20px 0;text-align:left;background:#f4f9f9;padding:15px;border-radius:12px;border:1px solid #e2e8f0;">
                        <p style="margin:0 0 8px;font-size:.9rem;color:#64748b;"><strong>Ofrece:</strong> <span style="color:#093c5c;">${ofrece}</span></p>
                        <p style="margin:0;font-size:.9rem;color:#64748b;"><strong>Busca:</strong> <span style="color:#093c5c;">${busca}</span></p>
                    </div>

                    <form class="form-proponer">
                        <input type="hidden" name="receptor_id"        value="${user.id_usuario}">
                        <input type="hidden" name="habilidad_ofrecida" value="${this.ofrezco}">
                        <input type="hidden" name="habilidad_buscada"  value="${this.busco}">
                        <button type="submit"
                            style="width:100%;background:#2ab5b9;color:#fff;border:none;padding:12px;
                                   border-radius:12px;font-family:'Urbanist',sans-serif;font-weight:700;
                                   font-size:1rem;cursor:pointer;transition:background .3s;"
                            onmouseover="this.style.background='#1f8a8d'"
                            onmouseout="this.style.background='#2ab5b9'">
                            <i class="fa-regular fa-paper-plane"></i> Proponer Trueque
                        </button>
                    </form>
                </div>`;
            });

            this.contenedor.innerHTML = htmlCards;

        } catch (err) {
            console.error('Error al cargar matches:', err);
        }
    }

    async procesarPropuesta(e) {
        if (!e.target || !e.target.classList.contains('form-proponer')) return;
        e.preventDefault();

        const form    = e.target;
        const formData= new FormData(form);
        const boton   = form.querySelector('button');

        boton.innerHTML = "Enviando... <i class='fa-solid fa-spinner fa-spin'></i>";
        boton.style.background = '#9ca3af';
        boton.disabled = true;

        try {
            const res  = await fetch('php/crear_trueque.php', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.success) {
                boton.style.background = '#22c55e';
                boton.innerHTML = "¡Enviado! <i class='fa-solid fa-check'></i>";
                alert('🍄 ' + data.mensaje);
            } else {
                boton.style.background = '#ef4444';
                boton.innerText = 'Error ❌';
                alert('Error: ' + (data.error || data.mensaje));
            }
        } catch (err) {
            boton.style.background = '#ef4444';
            boton.innerText = 'Fallo de Red';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new MotorMatchesController());
