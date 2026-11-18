class AuthManager {
    #api;
    constructor() {
        this.#api = new APIService();
        this.iniciarFormularios();
    }

    iniciarFormularios() {
        const formLogin = document.getElementById("form-login");
        if (formLogin) {
            formLogin.addEventListener("submit", e => { e.preventDefault(); alert("¡Bienvenido de nuevo!"); window.location.href = "my_perfil.html"; });
        }

        const formRegistro = document.getElementById("form-registro"); 
        if (formRegistro) {
            formRegistro.addEventListener("submit", async e => {
                e.preventDefault(); 
                const formData = new FormData(formRegistro);

                const nuevoUser = UsuarioFactory.crearUsuario(formData);
                nuevoUser.configurarPerfil(); 

                const respuestaPHP = await this.#api.enviarRegistro(formData);
                if (respuestaPHP.trim() === "exitoso") {
                    alert(`¡Registro completado con éxito, ${nuevoUser.getNombre()}!`);
                    window.location.href = 'conocer_us.html'; 
                } else alert("Error del servidor: " + respuestaPHP);
            });
        }

        const btnLogout = document.getElementById("btn-cerrar-sesion");
        if (btnLogout) {
            btnLogout.addEventListener("click", e => { e.preventDefault(); localStorage.removeItem("usuarioActivo"); window.location.href = "index2.html"; });
        }
    }
}
