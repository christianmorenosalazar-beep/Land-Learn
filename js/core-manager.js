class CoreManager {
    constructor() {
        this.testActual = "";
        this.basePreguntas = {
            programacion: { titulo: "Test: Programación Web", preguntas: [{ q: "¿Qué etiqueta HTML se utiliza para enlazar un archivo CSS externo?", opciones: ["<script>", "<link>", "<style>"], correcta: 1 }, { q: "¿Qué lenguaje se usa para interactividad?", opciones: ["CSS", "HTML", "JavaScript"], correcta: 2 }, { q: "En CSS, ¿qué propiedad cambia el color del texto?", opciones: ["color", "font-color", "text-style"], correcta: 0 }] },
            mecanica: { titulo: "Test: Mecánica de Motos", preguntas: [{ q: "¿Qué elemento debes revisar y lubricar regularmente?", opciones: ["Espejos", "Cadena de transmisión", "Asiento"], correcta: 1 }, { q: "¿Para qué sirve el aceite sintético?", opciones: ["Lubricar y enfriar", "Más potencia", "Que no rechinen frenos"], correcta: 0 }, { q: "¿Cuándo cambiar balatas?", opciones: ["Cambian a rojo", "Gasolina baja", "Rechinan o grosor mínimo"], correcta: 2 }] },
            matematicas: { titulo: "Test: Ciencias Matemáticas", preguntas: [{ q: "¿Resultado de 2x + 5 = 15?", opciones: ["x = 5", "x = 10", "x = 7"], correcta: 0 }, { q: "¿Qué representa la derivada en un punto?", opciones: ["Área bajo curva", "Pendiente de recta tangente", "Intersección X"], correcta: 1 }, { q: "¿Cómo se define el Seno?", opciones: ["Opuesto / Hipotenusa", "Adyacente / Hipotenusa", "Opuesto / Adyacente"], correcta: 0 }] },
            fisica: { titulo: "Test: Física General", preguntas: [{ q: "Según Newton (2da Ley), ¿a qué equivale la Fuerza?", opciones: ["Masa x velocidad", "Masa x aceleración", "Trabajo / tiempo"], correcta: 1 }, { q: "Unidad de energía en el S.I.", opciones: ["Newton", "Watt", "Joule"], correcta: 2 }, { q: "¿Luz cambiando de medio?", opciones: ["Reflexión", "Refracción", "Difracción"], correcta: 1 }] },
            quimica: { titulo: "Test: Química Básica", preguntas: [{ q: "¿Qué es el número atómico?", opciones: ["Protones en núcleo", "Protones + neutrones", "Órbitas"], correcta: 0 }, { q: "Enlace que comparte electrones:", opciones: ["Iónico", "Covalente", "Metálico"], correcta: 1 }, { q: "Estado sin forma ni volumen y alta energía:", opciones: ["Líquido", "Gaseoso", "Sólido"], correcta: 1 }] },
            cocina: { titulo: "Test: Gastronomía", preguntas: [{ q: "Corte 'Juliana':", opciones: ["Cubos pequeños", "Tiras largas y delgadas", "Rodajas"], correcta: 1 }, { q: "¿A qué temperatura hierve el agua a nivel del mar?", opciones: ["80 °C", "100 °C", "120 °C"], correcta: 1 }, { q: "Base para un 'Roux':", opciones: ["Huevo y crema", "Harina y mantequilla", "Fécula y agua"], correcta: 1 }] },
            diseno: { titulo: "Test: Diseño Gráfico", preguntas: [{ q: "Colores luz en pantallas:", opciones: ["RGB", "CMYK", "RYB"], correcta: 0 }, { q: "Formato con fondo transparente:", opciones: [".jpg", ".gif", ".png"], correcta: 2 }, { q: "Término 'Tipografía':", opciones: ["Espacio blanco", "Manejo de fuentes y texto", "Paleta colores"], correcta: 1 }] },
            herreria: { titulo: "Test: Herrería y Forja", preguntas: [{ q: "Herramienta manual en el yunque:", opciones: ["Cizalla", "Martillo de bola/macho", "Esmeril"], correcta: 1 }, { q: "Función del 'Templado':", opciones: ["Ablandar acero", "Aumentar dureza", "Eliminar óxido"], correcta: 1 }, { q: "EPP obligatorio al cortar con esmeril:", opciones: ["Gafas/careta", "Guantes de látex", "Arnés"], correcta: 0 }] },
            soldadura: { titulo: "Test: Soldadura Industrial", preguntas: [{ q: "En SMAW, propósito del recubrimiento del electrodo:", opciones: ["Conducción", "Generar gas protector", "Evitar cortos"], correcta: 1 }, { q: "Gas protector en MIG/MAG:", opciones: ["Oxígeno", "Argón o mezclas CO2", "Acetileno"], correcta: 1 }, { q: "¿Por qué usar careta fotocromática?", opciones: ["Mitigar vapores", "Proteger de rayos UV/IR", "Ampliar vista"], correcta: 1 }] }
        };
        this.iniciarHabilidades();
        this.iniciarTestEvaluacion();
        this.exponerFuncionesTests();
    }

    iniciarHabilidades() {
        const formHabilidad = document.getElementById('form-habilidad');
        if (formHabilidad) {
            formHabilidad.addEventListener('submit', function(e){
                e.preventDefault();
                const hab = document.getElementById('nueva-habilidad').value;
                const nivSel = document.getElementById('nivel-habilidad');
                const niv = nivSel.options[nivSel.selectedIndex].text;
                alert(`¡Genial! Has registrado: ${hab} con el nivel ${niv}.`);
                this.reset();
            });
        }
    }

    iniciarTestEvaluacion() {
        const formularioTest = document.getElementById("formulario-test");
        if (formularioTest) {
            formularioTest.addEventListener("submit", (e) => {
                e.preventDefault();
                const datos = this.basePreguntas[this.testActual];
                let puntuacion = 0;
                datos.preguntas.forEach((pregunta, index) => {
                    const resp = document.querySelector(`input[name="p${index}"]:checked`);
                    if (resp && parseInt(resp.value) === pregunta.correcta) puntuacion++;
                });

                let nivelTexto = "", icono = "", mensaje = "";
                if (puntuacion <= 1) { nivelTexto = "Espora 🌱"; icono = "🌱"; mensaje = "¡Tienes las bases! Empieza a aprender."; } 
                else if (puntuacion === 2) { nivelTexto = "Micelio 🌿"; icono = "🌿"; mensaje = "¡Vas muy bien! Tienes conocimiento intermedio."; } 
                else { nivelTexto = "Fructificación 🍄"; icono = "🍄"; mensaje = "¡Eres un experto! Listo para enseñar a otros."; }

                document.getElementById("icono-nivel").innerText = icono;
                document.getElementById("titulo-resultado").innerText = mensaje;
                document.getElementById("texto-resultado").innerHTML = `Tu nivel evaluado es: <strong style="color: var(--learn-cyan);">${nivelTexto}</strong> (${puntuacion}/3 aciertos).`;
                document.getElementById("modal-resultado").style.display = "flex";
            });
        }
    }

    exponerFuncionesTests() {
        window.iniciarTest = (tema) => {
            this.testActual = tema;
            const datos = this.basePreguntas[tema];
            document.getElementById("titulo-test").innerText = datos.titulo;
            const contenedor = document.getElementById("contenedor-preguntas");
            if(!contenedor) return;
            contenedor.innerHTML = ""; 
            datos.preguntas.forEach((pregunta, index) => {
                let opcionesHTML = "";
                pregunta.opciones.forEach((opcion, i) => { opcionesHTML += `<label class="opcion-respuesta"><input type="radio" name="p${index}" value="${i}" required> ${opcion}</label>`; });
                contenedor.innerHTML += `<div class="pregunta-bloque"><h4>${index + 1}. ${pregunta.q}</h4>${opcionesHTML}</div>`;
            });
            document.getElementById("vista-seleccion").classList.remove("activa");
            document.getElementById("vista-cuestionario").classList.add("activa");
        };

        window.volverSeleccion = () => {
            document.getElementById("vista-cuestionario").classList.remove("activa");
            document.getElementById("vista-seleccion").classList.add("activa");
        };

        window.cerrarModal = () => {
            document.getElementById("modal-resultado").style.display = "none";
            window.volverSeleccion();
            const formulario = document.getElementById("formulario-test");
            if(formulario) formulario.reset();
        };
    }
}
