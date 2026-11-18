class DashboardController {
    constructor() {
        this.selectOfrezco = document.getElementById('select-ofrezco');
        this.selectBusco = document.getElementById('select-busco');
        this.contenedorComunidad = document.getElementById('contenedor-comunidad');
        this.btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

        this.init();
    }

    async init() {
        this.inicializarEventosGlobales();
        await this.cargarHabilidadesDinámicas();
        await this.cargarComunidadDisponible();
    }

    inicializarEventosGlobales() {
        if (this.btnCerrarSesion) {
            this.btnCerrarSesion.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'php/logout.php';
            });
        }
    }

    async cargarHabilidadesDinámicas() {
        try {

            const response = await fetch('php/get_habilidades.php');
            const habilidades = await response.json();

            if (habilidades.error) return;

            let htmlOptions = '<option value="" disabled selected>Selecciona una opción...</option>';
            habilidades.forEach(hab => {
                htmlOptions += `<option value="${hab.nombre_habilidad}">${hab.icono} ${hab.nombre_habilidad}</option>`;
            });

            if (this.selectOfrezco) this.selectOfrezco.innerHTML = htmlOptions;
            if (this.selectBusco) this.selectBusco.innerHTML = htmlOptions;

        } catch (error) {
            console.error("Error al inyectar habilidades mutables:", error);
            const msgError = '<option value="">Error al cargar habilidades</option>';
            if (this.selectOfrezco) this.selectOfrezco.innerHTML = msgError;
        }
    }

    async cargarComunidadDisponible() {
        try {

            const response = await fetch('php/get_comunidad.php');
            const comunidad = await response.json();

            if (!this.contenedorComunidad) return;

            if (comunidad.length === 0) {
                this.contenedorComunidad.innerHTML = "<p style='color: gray; font-style: italic;'>No hay otros usuarios registrados en el ecosistema por el momento.</p>";
                return;
            }

            let htmlCards = '';
            comunidad.forEach(user => {
                const biografia = user.biografia ? user.biografia : "Miembro activo de Land Learn listo para compartir su conocimiento.";
                const rango = user.nivel_actual ? user.nivel_actual : "Espora";
                const apellido = user.apellido_paterno ? user.apellido_paterno : "";

                htmlCards += `
                    <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.02); display: flex; justify-content: space-between; align-items: center; border-left: 6px solid #64748b;">
                        <div>
                            <h4 style="color: #093c5c; font-size: 1.3rem; margin: 0; font-family: 'Poppins', sans-serif;">${user.nombre} ${apellido}</h4>
                            <p style="color: #2ab5b9; font-weight: bold; font-size: 0.9rem; margin: 4px 0 12px 0;">🍄 Rango micológico: ${rango}</p>
                            <p style="color: #64748b; margin: 0; font-size: 1rem; text-align: justify; line-height: 1.5;">${biografia}</p>
                        </div>
                        <span style="background: #f1f5f9; color: #64748b; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; white-space: nowrap; margin-left: 1rem;">Perfil Activo</span>
                    </div>
                `;
            });

            this.contenedorComunidad.innerHTML = htmlCards;

        } catch (error) {
            console.error("Error al mapear la comunidad activa:", error);
            if (this.contenedorComunidad) {
                this.contenedorComunidad.innerHTML = "<p style='color: red;'>Fallo crítico en el radar al conectar con la Red Mycelium.</p>";
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new DashboardController());
