class LandLearnApp {
    static arrancar() {
        new UIManager();
        new AuthManager();
        new CoreManager();
        new OnboardingManager();
        console.log("Arquitectura POO Land Learn Iniciada con Éxito.");
    }
}

document.addEventListener("DOMContentLoaded", () => LandLearnApp.arrancar());
