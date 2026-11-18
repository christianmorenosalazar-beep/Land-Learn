class OnboardingManager {
    #currentStep; #steps; #dots; #onboardingData;

    constructor() {
        if (document.querySelector('.onboarding-container')) {
            this.#currentStep = 0;
            this.#steps = document.querySelectorAll('.step');
            this.#dots = document.querySelectorAll('.step-dot');
            this.#onboardingData = {};
            this.exponerFunciones();
        }
    }

    exponerFunciones() {
        window.selectOption = (element, value) => {
            element.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            element.classList.add('selected');
            this.#onboardingData[this.#steps[this.#currentStep].id] = value;
        };

        window.changeStep = (n) => {
            if (n > 0 && !this.#onboardingData[this.#steps[this.#currentStep].id]) { alert("Por favor selecciona una opción para continuar."); return; }

            this.#steps[this.#currentStep].classList.remove('active');
            if (this.#dots[this.#currentStep]) this.#dots[this.#currentStep].classList.remove('active');

            this.#currentStep += n;

            if (this.#currentStep >= this.#steps.length) { window.finalizarOnboarding(); return; }

            this.#steps[this.#currentStep].classList.add('active');
            if (this.#dots[this.#currentStep]) this.#dots[this.#currentStep].classList.add('active');

            document.getElementById('btnBack').style.display = this.#currentStep === 0 ? 'none' : 'block';
            document.getElementById('btnNext').innerText = this.#currentStep === this.#steps.length - 1 ? 'Finalizar' : 'Siguiente';
        };

        window.finalizarOnboarding = () => {
            const dbUsuarios = JSON.parse(localStorage.getItem("usuariosLandLearn")) || [];
            const ultimoUser = dbUsuarios[dbUsuarios.length - 1];
            if(ultimoUser) {
                ultimoUser.onboarding = this.#onboardingData;
                localStorage.setItem("usuariosLandLearn", JSON.stringify(dbUsuarios));
            }
            alert("¡ADN Configurado! Bienvenido a la red Mycelium."); window.location.href = "perfil.html"; 
        };
    }
}
