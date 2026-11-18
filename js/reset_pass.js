class ResetPassController {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.tokenSecreto = urlParams.get('token');
        this.divMensaje = document.getElementById('mensaje-reset');
        this.formReset = document.getElementById('form-reset');

        this.validarEntorno();
    }

    validarEntorno() {
        if (!this.tokenSecreto) {
            this.divMensaje.style.color = "red";
            this.divMensaje.innerText = "Acceso denegado. Faltan credenciales de seguridad en la URL.";
            this.formReset.style.display = 'none'; 
            return;
        }

        this.formReset.addEventListener('submit', (e) => this.procesarCambio(e));
    }

    async procesarCambio(e) {
        e.preventDefault();

        const pass1 = document.getElementById('pass1').value;
        const pass2 = document.getElementById('pass2').value;

        if (pass1 !== pass2) {
            this.divMensaje.style.color = "red";
            this.divMensaje.innerText = "Error: Las contraseñas no coinciden.";
            return;
        }

        this.divMensaje.style.color = "black";
        this.divMensaje.innerHTML = "Guardando...";

        try {
            const response = await fetch('php/cambiar_pass.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${this.tokenSecreto}&password=${encodeURIComponent(pass1)}`
            });
            const datos = await response.json();

            if (datos.success) {
                this.divMensaje.style.color = "green";
                this.divMensaje.innerHTML = `✅ ${datos.mensaje} <br><br><a href="login.html">Ir al Login para entrar</a>`;
                this.formReset.style.display = 'none';
            } else {
                this.divMensaje.style.color = "red";
                this.divMensaje.innerText = `❌ ${datos.error}`;
            }
        } catch (err) {
            console.error("Error en Fetch:", err);
            this.divMensaje.style.color = "red";
            this.divMensaje.innerText = "Fallo de conexión al servidor PHP.";
        }
    }
}
document.addEventListener('DOMContentLoaded', () => new ResetPassController());
