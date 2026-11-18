(function () {
    const fetchOriginal = window.fetch.bind(window);

    let CSRF = null;
    let yaExpiro = false;

    const PAGINAS_PUBLICAS = ['index2.html', 'registro.html', 'recuperar.html', 'reset_pass.html', ''];

    function esPaginaPublica() {
        const p = window.location.pathname.split('/').pop();
        return PAGINAS_PUBLICAS.includes(p);
    }

    async function obtenerToken() {
        try {
            const r = await fetchOriginal('php/get_csrf.php');
            const d = await r.json();
            if (d.success && d.csrf_token) {
                CSRF = d.csrf_token;
                inyectarEnFormularios();
            }
        } catch (e) { }
    }

    function inyectarEnFormularios() {
        if (!CSRF) return;
        document.querySelectorAll('form').forEach(f => {
            let campo = f.querySelector('input[name="csrf_token"]');
            if (!campo) {
                campo = document.createElement('input');
                campo.type = 'hidden';
                campo.name = 'csrf_token';
                f.appendChild(campo);
            }
            campo.value = CSRF;
        });
    }

    function manejarExpiracion() {
        if (yaExpiro || esPaginaPublica()) return;
        yaExpiro = true;
        alert('Tu sesion expiro por inactividad. Vuelve a iniciar sesion.');
        window.location.href = 'index2.html?error=expirada';
    }

    window.fetch = function (recurso, opciones) {
        opciones = opciones || {};
        const metodo = (opciones.method || 'GET').toUpperCase();

        if (metodo === 'POST' && CSRF) {
            opciones.headers = Object.assign({}, opciones.headers || {}, { 'X-CSRF-Token': CSRF });
            if (opciones.body instanceof FormData && !opciones.body.has('csrf_token')) {
                opciones.body.append('csrf_token', CSRF);
            }
        }

        return fetchOriginal(recurso, opciones).then(function (respuesta) {
            if (respuesta.status === 401) {
                respuesta.clone().json()
                    .then(d => { if (d && d.sesion_expirada) manejarExpiracion(); })
                    .catch(() => { });
            }
            if (respuesta.status === 403) {
                respuesta.clone().json()
                    .then(d => { if (d && d.csrf_invalido) obtenerToken(); })
                    .catch(() => { });
            }
            return respuesta;
        });
    };

    window.tokenCSRF          = function () { return CSRF; };
    window.refrescarTokenCSRF = obtenerToken;

    document.addEventListener('DOMContentLoaded', obtenerToken);
})();
