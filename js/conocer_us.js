class OnboardingManager {
    constructor() {
        this.currentStep = 0;
        this.steps = document.querySelectorAll('.step');
        this.dots = document.querySelectorAll('.step-dot');
        this.btnNext = document.getElementById('btnNext');
        this.btnBack = document.getElementById('btnBack');
        this.onboardingData = {};

        this.inicializarEventos();
    }

    inicializarEventos() {

        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const parentGrid = target.closest('.options-grid');

                parentGrid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                target.classList.add('selected');

                const stepId = target.closest('.step').id;
                this.onboardingData[stepId] = target.getAttribute('data-value');
            });
        });

        if (this.btnNext) {
            this.btnNext.addEventListener('click', () => this.avanzarPaso());
        }

        if (this.btnBack) {
            this.btnBack.addEventListener('click', () => this.retrocederPaso());
        }
    }

    avanzarPaso() {
        const currentStepId = this.steps[this.currentStep].id;

        if (!this.onboardingData[currentStepId]) {
            alert("Por favor, selecciona una opción para continuar.");
            return;
        }

        this.ocultarPasoActual();
        this.currentStep++;

        if (this.currentStep >= this.steps.length) {
            this.enviarDatosPHP();
        } else {
            this.mostrarPasoActual();
            this.actualizarBotones();
        }
    }

    retrocederPaso() {
        if (this.currentStep > 0) {
            this.ocultarPasoActual();
            this.currentStep--;
            this.mostrarPasoActual();
            this.actualizarBotones();
        }
    }

    ocultarPasoActual() {
        this.steps[this.currentStep].classList.remove('active');
        if (this.dots[this.currentStep]) this.dots[this.currentStep].classList.remove('active');
    }

    mostrarPasoActual() {
        this.steps[this.currentStep].classList.add('active');
        if (this.dots[this.currentStep]) this.dots[this.currentStep].classList.add('active');
    }

    actualizarBotones() {
        this.btnBack.style.display = (this.currentStep === 0) ? 'none' : 'block';
        this.btnNext.innerText = (this.currentStep === this.steps.length - 1) ? 'Finalizar' : 'Siguiente';
    }

    async enviarDatosPHP() {
        const formData = new FormData();
        const area = this.onboardingData['step-1'] || '';
        const nivel = this.onboardingData['step-2'] || '';
        const biografiaGenerada = `Me interesa el área de ${area} y actualmente mi nivel es ${nivel}.`;

        formData.append('biografia', biografiaGenerada);
        formData.append('match_ideal', this.onboardingData['step-3'] || '');
        formData.append('disponibilidad', this.onboardingData['step-4'] || '');

        try {
            const response = await fetch('php/guardar_adn.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {

                window.location.href = 'my_perfil.html'; 
            } else {
                alert("Ocurrió un error al guardar tu perfil. Intenta de nuevo.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new OnboardingManager());
