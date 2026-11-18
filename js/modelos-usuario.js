class Usuario {
    #nombre; #correo;
    constructor(nombre, correo) { 
        this.#nombre = nombre; 
        this.#correo = correo; 
    }
    getNombre() { return this.#nombre; }

    configurarPerfil() { console.log("Configurando perfil genérico..."); }
}

class Mentor extends Usuario {
    #habilidad;
    constructor(nombre, correo, habilidad) { 
        super(nombre, correo); // Herencia
        this.#habilidad = habilidad; 
    }
    configurarPerfil() { console.log(`Mentor ${this.getNombre()} listo para enseñar ${this.#habilidad}.`); }
}

class Aprendiz extends Usuario {
    constructor(nombre, correo) { super(nombre, correo); }
    configurarPerfil() { console.log(`Aprendiz ${this.getNombre()} listo para aprender.`); }
}

class UsuarioFactory {
    static crearUsuario(formData) {
        const nombre = formData.get("nombre");
        const correo = formData.get("email");
        const habilidad = formData.get("habilidad");
        return (habilidad && habilidad.trim() !== "") ? new Mentor(nombre, correo, habilidad) : new Aprendiz(nombre, correo);
    }
}
