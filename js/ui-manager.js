class UIManager {
    constructor() {
        this.iniciarModalesYTransiciones();
        this.iniciarPestanas();
    }

    iniciarModalesYTransiciones() {

        const modal = document.getElementById("modal-login");
        const btnAbrir = document.getElementById("btn-abrir-login");
        const btnCerrar = document.getElementById("btn-cerrar-login");

        if (btnAbrir && modal && btnCerrar) {
            btnAbrir.addEventListener("click", e => { e.preventDefault(); modal.style.display = "flex"; });
            btnCerrar.addEventListener("click", () => modal.style.display = "none");
            window.addEventListener("click", e => { if (e.target == modal) modal.style.display = "none"; });
        }

        const btnNavRegistro = document.getElementById('btn-abrir-registro');
        const btnHeroRegistro = document.getElementById('btn-hero-registro');
        const linkModalRegistro = document.getElementById('link-modal-registro');
        const btnVolverInicio = document.getElementById('btn-volver-inicio');

        const abrirRegistro = (e) => {
            if(e) e.preventDefault();
            if(modal) {
                modal.style.opacity = "0"; 
                setTimeout(() => { modal.style.display = "none"; modal.style.opacity = "1"; document.body.classList.add('mostrar-registro'); }, 300); 
            } else {
                document.body.classList.add('mostrar-registro');
            }
        };

        if (btnNavRegistro) btnNavRegistro.addEventListener('click', abrirRegistro);
        if (btnHeroRegistro) btnHeroRegistro.addEventListener('click', abrirRegistro);
        if (linkModalRegistro) linkModalRegistro.addEventListener('click', abrirRegistro);
        if (btnVolverInicio) btnVolverInicio.addEventListener('click', e => { e.preventDefault(); document.body.classList.remove('mostrar-registro'); });

        window.togglePassword = function() {
            const pass = document.getElementById('pass');
            const icon = document.getElementById('eyeIcon');
            if (pass && icon) {
                const esPass = pass.type === 'password';
                pass.type = esPass ? 'text' : 'password';
                icon.className = esPass ? "fa-regular fa-eye" : "fa-regular fa-eye-slash";
            }
        };
    }

    iniciarPestanas() {
        window.cambiarPestana = function(vista) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('activa'));
            document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
            if(vista === 'registro') {
                if(document.querySelectorAll('.tab-btn')[0]) document.querySelectorAll('.tab-btn')[0].classList.add('activa');
                if(document.getElementById('seccion-registro')) document.getElementById('seccion-registro').classList.add('activa');
            } else {
                if(document.querySelectorAll('.tab-btn')[1]) document.querySelectorAll('.tab-btn')[1].classList.add('activa');
                if(document.getElementById('seccion-comunidad')) document.getElementById('seccion-comunidad').classList.add('activa');
            }
        };
    }
}
