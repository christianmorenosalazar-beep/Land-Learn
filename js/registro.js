class RegistroUI {
    constructor() {
        this.btnToggle = document.getElementById('btn-toggle');
        this.passInput = document.getElementById('pass');
        this.eyeIcon = document.getElementById('eyeIcon');
        this.inicializarEventos();
    }

    inicializarEventos() {
        if (this.btnToggle && this.passInput && this.eyeIcon) {
            this.btnToggle.addEventListener('click', () => this.togglePassword());
        }
    }

    togglePassword() {
        if (this.passInput.type === 'password') {
            this.passInput.type = 'text';
            this.eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            this.passInput.type = 'password';
            this.eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => new RegistroUI());
