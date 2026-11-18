class RecuperarController {
    constructor() {
        this.form = document.getElementById('form-recuperar');
        this.emailInput = document.getElementById('email-input');
        this.divMensaje = document.getElementById('mensaje-respuesta');

        if(this.form) {
            this.form.addEventListener('submit', (e) => this.procesarFormulario(e));
        }
    }

    async procesarFormulario(e) {
        e.preventDefault();

        this.divMensaje.style.color = "black";
        this.divMensaje.innerHTML = "Procesando solicitud...";

        try {
            const response = await fetch('php/generar_token.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${encodeURIComponent(this.emailInput.value)}`
            });
            const textoCrudo = await response.text();
            console.log("LO QUE PHP RESPONDIÓ ES ESTO:", textoCrudo);

            try {
                const datos = JSON.parse(textoCrudo);
                if (datos.success) {
                    this.divMensaje.style.color = "green";
                    this.divMensaje.innerHTML = `Token generado exitosamente.<br><br>👉 <a href="${datos.link}" style="color: #2ab5b9; text-decoration: underline;">Haz clic aquí para crear tu nueva contraseña</a>`;
                    this.emailInput.value = ''; 
                } else {
                    this.divMensaje.style.color = "red";
                    this.divMensaje.innerText = datos.error;
                }
            } catch (err) {
                this.divMensaje.style.color = "red";
                this.divMensaje.innerHTML = "<b>Error de PHP:</b> Abre F12 y mira la consola.";
            }
        } catch (err) {
            console.error("Error en Fetch:", err);
            this.divMensaje.style.color = "red";
            this.divMensaje.innerText = "Error de red: No se encontró el archivo PHP.";
        }
    }
}
document.addEventListener('DOMContentLoaded', () => new RecuperarController());
