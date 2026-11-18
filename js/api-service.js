class APIService {
    static #instancia; // Encapsulamiento estricto

    constructor() {
        if (APIService.#instancia) return APIService.#instancia;
        APIService.#instancia = this;
    }

    async enviarRegistro(formData) {
        try {
            const respuesta = await fetch('auth_register.php', { method: 'POST', body: formData });
            return await respuesta.text();
        } catch (error) {
            console.error("Error en la conexión PHP:", error);
            return "error";
        }
    }
}
