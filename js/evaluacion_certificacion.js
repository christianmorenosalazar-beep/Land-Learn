const BANCO = {
    "Diseño Web": [
        {q:"¿Qué etiqueta HTML enlaza un CSS externo?", op:["<link>","<style>","<script>","<css>"], c:0},
        {q:"¿Propiedad CSS para el color del texto?", op:["font-color","text-color","color","text-style"], c:2},
        {q:"¿Qué significa 'responsive design'?", op:["Diseño que responde a clics","Adaptable a distintos tamaños de pantalla","Diseño rápido","Diseño con animaciones"], c:1},
        {q:"¿Para qué sirve Flexbox?", op:["Animar elementos","Distribuir elementos en una dirección","Crear tablas","Definir fuentes"], c:1},
        {q:"¿Qué hace position: absolute?", op:["Fija el elemento al viewport","Posiciona relativo al padre posicionado","Lo quita del flujo normal sin referencia","Ocupa todo el ancho"], c:1},
        {q:"¿Cuál es la unidad relativa al tamaño de fuente del elemento padre?", op:["px","em","vw","rem"], c:1},
        {q:"¿Qué es el 'box model' en CSS?", op:["Modelo de cajas 3D","Sistema de margin, border, padding y content","Framework de diseño","Formato de colores"], c:1},
        {q:"¿Para qué se usa z-index?", op:["Definir transparencia","Controlar la superposición de elementos","Ajustar el zoom","Crear columnas"], c:1},
        {q:"¿Qué atributo HTML hace un campo obligatorio?", op:["mandatory","required","must","obligatory"], c:1},
        {q:"¿Qué hace display: none?", op:["Vuelve invisible pero ocupa espacio","Elimina el elemento del DOM","Oculta el elemento sin ocupar espacio","Lo traslada fuera de pantalla"], c:2},
        {q:"¿Cuál selector CSS tiene mayor especificidad?", op:["Clase (.clase)","Etiqueta (div)","ID (#id)","* (universal)"], c:2},
        {q:"¿Qué hace meta viewport en HTML?", op:["Define el idioma","Controla la escala en móviles","Agrega favicon","Define el charset"], c:1},
        {q:"¿Para qué sirve localStorage en JS?", op:["Comunicarse con el servidor","Guardar datos en el navegador sin expiración","Crear cookies seguras","Manejar sesiones PHP"], c:1},
        {q:"¿Qué es un media query?", op:["Petición de datos","Regla CSS condicional según dispositivo","Función JavaScript","Tipo de selector"], c:1},
        {q:"¿Cuál etiqueta es semánticamente correcta para navegación?", op:["<div id='nav'>","<navigation>","<nav>","<menu>"], c:2},
        {q:"¿Qué hace fetch() en JavaScript?", op:["Renderiza HTML","Realiza peticiones HTTP asíncronas","Crea animaciones","Selecciona elementos del DOM"], c:1},
        {q:"¿Grid vs Flexbox: cuándo usar Grid?", op:["Solo para botones","Diseños en dos dimensiones (filas y columnas)","Solo para imágenes","Cuando Flexbox falla"], c:1},
        {q:"¿Qué es un pseudo-elemento CSS como ::before?", op:["Un selector de atributo","Contenido generado antes del elemento","Un selector de estado","Un tipo de variable"], c:1},
        {q:"¿Cuál es la diferencia entre == y === en JS?", op:["Ninguna","=== compara tipo y valor","== es más estricta","=== solo compara strings"], c:1}
    ],
    "Mecánica": [
        {q:"¿Qué elemento se debe lubricar regularmente en una moto?", op:["Espejos","Cadena de transmisión","Asiento","Bocina"], c:1},
        {q:"¿Para qué sirve el aceite sintético en el motor?", op:["Aumentar potencia","Lubricar y enfriar partes internas","Mejorar frenos","Limpiar filtros"], c:1},
        {q:"¿Cuándo cambiar las balatas de un vehículo?", op:["Cada año sin falta","Cuando rechinan o alcanzan grosor mínimo","Al cambiar las llantas","Cuando el motor falla"], c:1},
        {q:"¿Qué hace el sistema de suspensión?", op:["Frena el vehículo","Absorbe impactos y mantiene estabilidad","Enfría el motor","Transmite potencia"], c:1},
        {q:"¿Qué herramienta se usa para apretar tornillos con torque específico?", op:["Desarmador","Llave Allen","Llave de torque","Pinza de presión"], c:2},
        {q:"¿Qué indica una luz de temperatura alta en el tablero?", op:["Batería baja","Motor sobrecalentado","Aceite bajo","Llanta ponchada"], c:1},
        {q:"¿Cuál es la función del diferencial?", op:["Filtrar el combustible","Permitir que las ruedas giren a velocidades distintas en curvas","Enfriar el motor","Ajustar la dirección"], c:1},
        {q:"¿Qué es el par motor (torque)?", op:["Velocidad máxima","Fuerza de rotación que genera el motor","Consumo de combustible","Temperatura de operación"], c:1},
        {q:"¿Por qué se hace el cambio de aceite periódicamente?", op:["Para ahorrar gasolina","El aceite se degrada y pierde propiedades lubricantes","Para limpiar los frenos","Para resetear el odómetro"], c:1},
        {q:"¿Qué es la correa de distribución?", op:["Cinturón de seguridad del motor","Elemento que sincroniza cigüeñal y árbol de levas","Cadena de la transmisión","Banda del alternador"], c:1},
        {q:"¿Cuándo se recomienda revisar el nivel de líquido de frenos?", op:["Nunca, es sellado","Cada mantenimiento o si el pedal se siente blando","Solo al comprar el auto","Cada 10 años"], c:1},
        {q:"¿Qué hace el alternador?", op:["Arranca el motor","Genera electricidad para cargar la batería mientras el motor corre","Bombea combustible","Controla la inyección"], c:1},
        {q:"¿Qué sistema se encarga de convertir el movimiento lineal en rotacional?", op:["Sistema de frenos","Sistema de dirección","Cigüeñal y bielas","Sistema de escape"], c:2},
        {q:"¿Por qué las llantas tienen dibujo (tread)?", op:["Estética","Para drenar agua y mantener tracción","Reducir peso","Aumentar velocidad máxima"], c:1},
        {q:"¿Qué hace el sistema EFI (inyección electrónica)?", op:["Controla la suspensión","Mezcla combustible y aire electrónicamente","Regula la transmisión","Controla el ABS"], c:1},
        {q:"¿Cuál es la función del catalizador?", op:["Aumentar potencia","Reducir gases contaminantes del escape","Filtrar el aceite","Enfriar el escape"], c:1},
        {q:"¿Qué es el juego en la dirección?", op:["La velocidad de giro del volante","El movimiento libre del volante antes de que las ruedas respondan","La distancia entre ejes","El radio de giro"], c:1},
        {q:"¿Cuándo se debe cambiar el filtro de aire?", op:["Cada 1,000 km","Según el manual, generalmente cada 15,000-30,000 km","Solo cuando el motor falla","Cada vez que llueve"], c:1},
        {q:"¿Qué es el fusible en el sistema eléctrico?", op:["Un interruptor manual","Un dispositivo de protección que corta al sobrecargarse","Un tipo de batería","Un relé de arranque"], c:1}
    ],
    "Matemáticas": [
        {q:"¿Resultado de 2x + 5 = 15?", op:["x=4","x=5","x=6","x=10"], c:1},
        {q:"¿Qué representa la derivada de una función en un punto?", op:["El área bajo la curva","La pendiente de la recta tangente","La integral definida","El valor máximo"], c:1},
        {q:"¿Cuál es el valor de sen(90°)?", op:["0","0.5","1","-1"], c:2},
        {q:"¿Qué es una matriz cuadrada?", op:["Tiene más columnas que filas","Tiene igual número de filas y columnas","Solo tiene una fila","Solo tiene una columna"], c:1},
        {q:"¿Cuál es la fórmula del área del círculo?", op:["2πr","πr²","πd","2πr²"], c:1},
        {q:"¿Qué es la media aritmética?", op:["El valor central de un conjunto","La suma de valores dividida entre la cantidad","El valor que más se repite","La diferencia entre el mayor y menor valor"], c:1},
        {q:"¿Cuánto es log₁₀(1000)?", op:["2","3","4","10"], c:1},
        {q:"¿Qué es el número π (pi)?", op:["Razón circunferencia/diámetro","Raíz cuadrada de 2","Número de Euler","Base del logaritmo natural"], c:0},
        {q:"¿Cuál es la solución de x² - 4 = 0?", op:["x=2","x=±2","x=4","x=-4"], c:1},
        {q:"¿Qué propiedad tiene la función f(x)=x² respecto al eje Y?", op:["Es asimétrica","Es par (simétrica respecto al eje Y)","Es impar","No tiene simetría"], c:1},
        {q:"¿Cuánto es la integral de cos(x)?", op:["cos(x)","sen(x)","-sen(x)","-cos(x)"], c:1},
        {q:"En probabilidad, ¿qué vale P(A) + P(A')?", op:["0","0.5","1","Depende"], c:2},
        {q:"¿Qué es el determinante de una matriz 2x2 [a,b;c,d]?", op:["a+d","ad-bc","ab-cd","a*d"], c:1},
        {q:"¿Qué es una función biyectiva?", op:["Inyectiva pero no sobreyectiva","Sobreyectiva pero no inyectiva","A la vez inyectiva y sobreyectiva","Ni inyectiva ni sobreyectiva"], c:2},
        {q:"¿Cuánto es 5! (factorial de 5)?", op:["25","60","120","720"], c:2},
        {q:"¿Qué establece el Teorema de Pitágoras?", op:["a+b=c","a²+b²=c²","a²-b²=c²","2a+2b=c"], c:1},
        {q:"¿Qué es una progresión aritmética?", op:["Sucesión donde cada término se multiplica por una constante","Sucesión donde la diferencia entre términos consecutivos es constante","Sucesión de números primos","Serie infinita divergente"], c:1},
        {q:"¿Cuál es la derivada de e^x?", op:["x·e^(x-1)","e^x","1/e^x","ln(x)"], c:1},
        {q:"¿Qué es el dominio de una función?", op:["El conjunto de valores que puede tomar f(x)","El conjunto de valores que puede tomar x","El rango de la función","La imagen de la función"], c:1}
    ],
    "Física": [
        {q:"Según la 2da Ley de Newton, ¿F es igual a?", op:["m/a","m+a","m×a","m-a"], c:2},
        {q:"¿Cuál es la unidad de energía en el SI?", op:["Newton","Watt","Joule","Pascal"], c:2},
        {q:"¿Qué fenómeno ocurre cuando la luz cambia de medio?", op:["Reflexión","Refracción","Difracción","Absorción"], c:1},
        {q:"¿Cuál es la velocidad de la luz en el vacío aprox.?", op:["300,000 km/s","150,000 km/s","3,000 km/s","30,000 km/s"], c:0},
        {q:"¿Qué establece la Ley de Conservación de Energía?", op:["La energía se crea a partir de la nada","La energía total de un sistema aislado permanece constante","La energía siempre se pierde","La masa y energía no se relacionan"], c:1},
        {q:"¿Qué mide el amperímetro?", op:["Voltaje","Resistencia","Corriente eléctrica","Potencia"], c:2},
        {q:"¿Qué es el trabajo (W) en física?", op:["Fuerza dividida entre distancia","Fuerza multiplicada por desplazamiento en su dirección","Masa por gravedad","Potencia por tiempo"], c:1},
        {q:"¿Cuál es la ley de Ohm?", op:["I = R/V","V = I·R","R = V·I","P = I/V"], c:1},
        {q:"¿Qué tipo de onda es el sonido?", op:["Electromagnética transversal","Mecánica longitudinal","Electromagnética longitudinal","Mecánica transversal"], c:1},
        {q:"¿Qué es la inercia?", op:["La aceleración de un cuerpo","La resistencia de un cuerpo a cambiar su estado de movimiento","La fuerza gravitacional","El peso de un objeto"], c:1},
        {q:"¿Cuánto vale la gravedad en la Tierra aproximadamente?", op:["9.8 m/s²","9.8 m/s","8.9 m/s²","10.8 m/s²"], c:0},
        {q:"¿Qué es la presión?", op:["Fuerza por área","Fuerza dividida entre área","Masa por volumen","Energía por tiempo"], c:1},
        {q:"¿Qué es el efecto Doppler?", op:["Cambio de color de la luz","Cambio de frecuencia percibida por movimiento relativo entre fuente y observador","Reflexión del sonido","Interferencia de ondas"], c:1},
        {q:"¿Qué mide el voltímetro?", op:["Corriente","Resistencia","Diferencia de potencial eléctrico","Potencia"], c:2},
        {q:"¿Qué es la densidad?", op:["Peso del objeto","Masa por unidad de volumen","Volumen por unidad de masa","Fuerza por unidad de área"], c:1},
        {q:"¿Cuál es la unidad de potencia?", op:["Joule","Newton","Watt","Volt"], c:2},
        {q:"¿Qué es un campo magnético?", op:["Campo gravitacional","Región donde se ejerce fuerza magnética","Campo eléctrico negativo","Zona sin carga eléctrica"], c:1},
        {q:"¿Qué establece el principio de Arquímedes?", op:["Todo cuerpo sumergido flota","Un cuerpo recibe empuje igual al peso del fluido desplazado","La presión aumenta con la temperatura","Los gases se comprimen bajo presión"], c:1},
        {q:"¿Qué es la aceleración?", op:["Variación de posición respecto al tiempo","Variación de velocidad respecto al tiempo","Fuerza por masa","Distancia por tiempo"], c:1}
    ],
    "Química": [
        {q:"¿Qué es el número atómico?", op:["Número de neutrones","Número de protones en el núcleo","Número de electrones + protones","Masa del átomo"], c:1},
        {q:"¿Qué tipo de enlace comparte electrones?", op:["Iónico","Metálico","Covalente","Puente de hidrógeno"], c:2},
        {q:"¿Cuál estado de la materia no tiene forma ni volumen definidos?", op:["Sólido","Líquido","Gaseoso","Plasma"], c:2},
        {q:"¿Qué es un mol en química?", op:["6.022×10²³ partículas","1 gramo de sustancia","Un litro de solución","La masa atómica en gramos"], c:0},
        {q:"¿Cuál es el símbolo del sodio?", op:["So","Sa","Na","S"], c:2},
        {q:"¿Qué indica el pH?", op:["Temperatura de una solución","Concentración de iones H⁺ (acidez/basicidad)","Densidad del líquido","Número de moles disueltos"], c:1},
        {q:"¿Qué es una reacción exotérmica?", op:["Absorbe calor del entorno","Libera calor al entorno","Ocurre solo en frío","Requiere catalizador siempre"], c:1},
        {q:"¿Cuál es la fórmula del agua?", op:["HO","H₂O","H₃O","OH₂"], c:1},
        {q:"¿Qué es la electronegatividad?", op:["Carga del núcleo","Tendencia de un átomo a atraer electrones en un enlace","Número de electrones de valencia","Energía de ionización"], c:1},
        {q:"¿Qué es una solución saturada?", op:["Sin soluto disuelto","Contiene la máxima cantidad de soluto que puede disolverse a esa temperatura","Con exceso de solvente","Sin solvente"], c:1},
        {q:"¿Cuál es el número atómico del carbono?", op:["6","8","12","14"], c:0},
        {q:"¿Qué es la oxidación?", op:["Ganancia de electrones","Pérdida de electrones","Ganancia de protones","Formación de iones negativos"], c:1},
        {q:"¿Qué hace un catalizador en una reacción?", op:["Aumenta la cantidad de producto","Acelera la reacción sin consumirse","Eleva la temperatura de reacción","Cambia el equilibrio final"], c:1},
        {q:"¿Qué es la masa molar?", op:["Masa de un átomo en u.m.a","Masa en gramos de un mol de sustancia","Densidad del compuesto","Número de moles en un litro"], c:1},
        {q:"¿Cuál es la diferencia entre átomo e ión?", op:["El ión tiene más neutrones","El ión tiene carga eléctrica por ganancia/pérdida de electrones","El átomo es más pesado","No hay diferencia práctica"], c:1},
        {q:"¿Qué es la destilación?", op:["Filtración de sólidos","Separación de mezclas por diferencia de puntos de ebullición","Reacción de oxidación","Cristalización de sales"], c:1},
        {q:"¿Cuál es el grupo de los gases nobles en la tabla periódica?", op:["Grupo 1","Grupo 7","Grupo 17","Grupo 18"], c:3},
        {q:"¿Qué son los isótopos?", op:["Átomos de diferente elemento","Átomos del mismo elemento con diferente número de neutrones","Moléculas con misma fórmula pero diferente estructura","Iones con igual carga"], c:1},
        {q:"¿Qué es la ley de conservación de la masa?", op:["La energía no se crea ni se destruye","En una reacción química la masa total de reactivos = masa total de productos","La masa cambia con la temperatura","Los sólidos pesan más que los gases"], c:1}
    ],
    "Gastronomía": [
        {q:"¿Qué corte es una 'Juliana'?", op:["Cubos pequeños","Tiras largas y delgadas","Rodajas gruesas","Cubos grandes"], c:1},
        {q:"¿A qué temperatura hierve el agua a nivel del mar?", op:["80°C","90°C","100°C","120°C"], c:2},
        {q:"¿Qué es un 'Roux'?", op:["Salsa de tomate","Mezcla de harina y grasa para espesar","Caldo de hueso","Marinada ácida"], c:1},
        {q:"¿Qué significa 'mise en place'?", op:["Técnica de corte","Preparar y organizar todos los ingredientes antes de cocinar","Método de cocción al vapor","Presentación del plato"], c:1},
        {q:"¿Cuál es la temperatura segura interna para pollo cocido?", op:["60°C","70°C","74°C","85°C"], c:2},
        {q:"¿Qué técnica consiste en cocinar en líquido a menos de 100°C?", op:["Hervir","Escalfar (pochar)","Freír","Estofar"], c:1},
        {q:"¿Qué hace el bicarbonato de sodio en repostería?", op:["Endulza la mezcla","Actúa como leudante liberando CO₂","Da color oscuro","Estabiliza las grasas"], c:1},
        {q:"¿Cuál es la diferencia entre stock y caldo?", op:["Son lo mismo","Stock se hace con huesos (colágeno), caldo con carne","Caldo es más concentrado","Stock es más salado"], c:1},
        {q:"¿Qué técnica es el 'flambear'?", op:["Cocinar al vacío","Prender fuego al alcohol añadido al platillo","Glasear con caramelo","Cocinar en grasa abundante"], c:1},
        {q:"¿Cuál es la función principal de la sal en la cocina?", op:["Solo dar sabor","Potenciar sabores, conservar y controlar proteínas","Solo conservar alimentos","Endulzar"], c:1},
        {q:"¿Qué es la emulsión en cocina?", op:["Mezcla de dos sólidos","Mezcla estable de dos líquidos no miscibles (grasa y agua)","Gel de proteínas","Reducción de un caldo"], c:1},
        {q:"¿Qué es el método FIFO en almacenamiento?", op:["Guardar lo más nuevo al frente","Primero en entrar, primero en salir","Ordenar por tamaño","Guardar por categorías"], c:1},
        {q:"¿Cuál es la temperatura de la zona de peligro bacteriológico?", op:["0°C a 20°C","5°C a 60°C","20°C a 80°C","10°C a 40°C"], c:1},
        {q:"¿Qué es el mirepoix?", op:["Técnica de corte fino","Combinación aromática de cebolla, zanahoria y apio","Salsa madre francesa","Tipo de pasta"], c:1},
        {q:"¿Qué es la caramelización?", op:["Reacción de proteínas con azúcares","Transformación del azúcar por calor sin proteínas","Fermentación de lactosa","Oxidación de grasas"], c:1},
        {q:"¿Para qué sirve la gelatina en pastelería?", op:["Dar sabor","Gelificar y estabilizar preparaciones","Endulzar","Leventar masas"], c:1},
        {q:"¿Qué corte es el 'Brunoise'?", op:["Tiras largas","Rodajas","Cubos muy pequeños (~3mm)","Cubos grandes"], c:2},
        {q:"¿Cuál es la regla básica de la higiene de manos en cocina?", op:["Lavarlas al inicio del turno","Lavarlas antes y después de manejar alimentos crudos, al cambiar de tarea y tras contaminación","Solo si están visiblemente sucias","Usar guantes siempre en lugar de lavarlas"], c:1},
        {q:"¿Qué es la pasta choux?", op:["Masa de hojaldre","Masa cocida en la estufa con agua, mantequilla, harina y huevos (éclairs, profiteroles)","Masa de pan dulce","Pasta de almendras"], c:1}
    ],
    "Diseño Gráfico": [
        {q:"¿Cuáles son los colores primarios en el modelo RGB?", op:["Rojo, Amarillo, Azul","Rojo, Verde, Azul","Cian, Magenta, Amarillo","Rojo, Naranja, Verde"], c:1},
        {q:"¿Qué formato de imagen soporta transparencia?", op:[".jpg",".bmp",".png",".gif solo"], c:2},
        {q:"¿Qué es la tipografía?", op:["Diseño de logotipos","Arte y técnica de diseñar y organizar tipos de letra","Corrección de imágenes","Técnica de ilustración"], c:1},
        {q:"¿Cuál es la diferencia entre imagen vectorial y rasterizada?", op:["El vector es de mayor resolución","El vector usa fórmulas matemáticas y escala sin pérdida; el raster usa píxeles","No hay diferencia práctica","El raster escala mejor"], c:1},
        {q:"¿Qué es el kerning en tipografía?", op:["Altura de las letras","Espacio entre líneas","Ajuste de espacio entre pares de caracteres específicos","Grosor del trazo"], c:2},
        {q:"¿Para qué sirve el modo CMYK?", op:["Pantallas digitales","Impresión física en cuatricromía","Edición de video","Modelado 3D"], c:1},
        {q:"¿Qué es la jerarquía visual?", op:["Uso de muchos colores","Organización de elementos para guiar la atención del usuario","Alineación de textos","Tamaño del lienzo"], c:1},
        {q:"¿Qué es el espacio negativo?", op:["El color negro en un diseño","El área vacía alrededor de los elementos que ayuda a definirlos","El fondo de color oscuro","Las sombras del diseño"], c:1},
        {q:"¿Cuál es la regla de los tercios?", op:["Dividir el lienzo en 3 colores","Dividir el lienzo en 9 partes y colocar elementos clave en las intersecciones","Usar solo 3 tipografías","Limitar el diseño a 3 elementos"], c:1},
        {q:"¿Qué es el DPI (puntos por pulgada)?", op:["Tamaño del archivo","Medida de resolución de impresión","Velocidad del procesador gráfico","Profundidad de color"], c:1},
        {q:"¿Cuál es el propósito de un moodboard?", op:["Presentar el producto final","Recopilar referencias visuales para definir la dirección estética","Calcular el presupuesto","Crear la paleta de colores final"], c:1},
        {q:"¿Qué es el contraste en diseño?", op:["Usar muchos elementos","Diferencia entre elementos para hacerlos distinguibles","Repetición de patrones","Alineación de objetos"], c:1},
        {q:"¿Qué software de Adobe se usa principalmente para vectores?", op:["Photoshop","Premiere","Illustrator","InDesign"], c:2},
        {q:"¿Qué es el 'grid' o retícula en diseño?", op:["Tipo de tipografía","Sistema de guías invisibles para organizar el contenido","Formato de imagen","Efecto visual"], c:1},
        {q:"¿Cuál es la diferencia entre logotipo e isotipo?", op:["Son lo mismo","Logotipo es solo texto; isotipo es solo imagen/símbolo","Logotipo es más moderno","Isotipo siempre tiene texto"], c:1},
        {q:"¿Qué es la paleta de colores análogos?", op:["Colores opuestos en el círculo cromático","Colores adyacentes en el círculo cromático","Colores sin relación","Solo blanco y negro"], c:1},
        {q:"¿Qué es el leading en tipografía?", op:["Espacio entre caracteres","Espacio entre líneas de texto","Tamaño de la fuente","Peso del trazo"], c:1},
        {q:"¿Qué es la saturación de un color?", op:["Claridad del color","Intensidad o pureza del color","Temperatura del color","Tono del color"], c:1},
        {q:"¿Cuál es el propósito del prototipado en diseño UI?", op:["Crear el código final","Probar la usabilidad antes de desarrollar","Definir colores","Calcular costos"], c:1}
    ],
    "Herrería y Soldadura": [
        {q:"¿Qué herramienta se usa en el yunque para forjar?", op:["Cizalla","Martillo macho/de bola","Esmeril","Sierra"], c:1},
        {q:"¿Cuál es la función del templado en el acero?", op:["Ablandarlo para doblar","Aumentar su dureza","Eliminar el óxido","Cambiar su color"], c:1},
        {q:"¿Qué EPP es obligatorio al cortar con esmeril?", op:["Tapones para oídos","Careta/gafas de seguridad","Guantes de látex","Arnés"], c:1},
        {q:"En soldadura SMAW, ¿para qué sirve el recubrimiento del electrodo?", op:["Conduce mejor la corriente","Genera gas protector y escoria","Evita cortocircuitos","Suelda más rápido"], c:1},
        {q:"¿Qué gas se usa en soldadura MIG/MAG?", op:["Oxígeno puro","Argón o mezclas con CO₂","Acetileno","Nitrógeno"], c:1},
        {q:"¿Por qué usar careta fotocromática en soldadura?", op:["Para ver más claro","Proteger ojos de rayos UV e IR del arco eléctrico","Por moda","Para evitar el humo"], c:1},
        {q:"¿Qué es el 'precalentamiento' en soldadura?", op:["Calentar el electrodo","Calentar el metal base antes de soldar para evitar grietas","Preparar los gases","Limpiar la soldadura"], c:1},
        {q:"¿Cuál proceso de soldadura NO requiere aporte de material?", op:["SMAW","MIG","Soldadura de puntos por resistencia","TIG con varilla"], c:2},
        {q:"¿Qué es la escoria en soldadura SMAW?", op:["Error en el cordón","Residuo del fundente del electrodo que protege el cordón en enfriamiento","Metal derretido","Oxígeno atrapado"], c:1},
        {q:"¿Qué herramienta mide ángulos en herrería?", op:["Calibrador","Escuadra y transportador","Micrómetro","Nivel de burbuja"], c:1},
        {q:"¿Qué es el 'recocido' del metal?", op:["Endurecimiento rápido","Calentamiento y enfriamiento lento para ablandar y reducir tensiones","Eliminación de carbono","Proceso de pulido"], c:1},
        {q:"¿Cuál es el peligro principal de los gases en soldadura?", op:["Ruido excesivo","Intoxicación y deficiencia de oxígeno en espacios cerrados","Electrocución","Incendio del equipo"], c:1},
        {q:"¿Qué es la 'penetración' en soldadura?", op:["Profundidad de fusión del metal base bajo el cordón","Altura del cordón","Ancho del cordón","Temperatura del arco"], c:0},
        {q:"¿Para qué sirve el disco de desbaste?", op:["Cortar láminas delgadas","Eliminar material, rebabas y preparar superficies","Pulir a espejo","Hacer ranuras finas"], c:1},
        {q:"¿Qué es la polaridad en soldadura eléctrica?", op:["El voltaje del equipo","La dirección del flujo de corriente que afecta la penetración y el calor","La frecuencia del arco","La velocidad del electrodo"], c:1},
        {q:"¿Cuál es la temperatura de fusión aproximada del acero común?", op:["800°C","1,200°C","1,400°C","1,538°C"], c:3},
        {q:"¿Qué es el 'punto de rocío' en soldadura bajo gas?", op:["Temperatura de precalentamiento","Temperatura a la que el gas protector condensa humedad","Temperatura del arco","Temperatura de solidificación"], c:1},
        {q:"¿Para qué se usa la pintura epoxi en herrería?", op:["Decoración únicamente","Protección anticorrosiva de alta dureza","Soldar mejor","Facilitar el corte"], c:1},
        {q:"¿Qué diferencia hay entre doblar y forjar?", op:["Son lo mismo","Doblar da forma en frío; forjar da forma con calor y golpes","Forjar es con máquina siempre","Doblar solo funciona en aluminio"], c:1}
    ]
};

let topicActual = '';
let preguntasDelExamen = [];
const MINIMO_APROBATORIO = 12;

function iniciarExamen(topic) {
    if (!BANCO[topic]) { alert('Modulo no disponible.'); return; }
    topicActual = topic;

    const banco = [...BANCO[topic]];
    banco.sort(() => Math.random() - 0.5);
    preguntasDelExamen = banco.slice(0, 15);

    renderizarExamen();
    document.getElementById('vista-seleccion').classList.remove('activa');
    document.getElementById('vista-cuestionario').classList.add('activa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderizarExamen() {
    const titulo = document.getElementById('titulo-test');
    if (titulo) titulo.innerText = `Certificacion: ${topicActual}`;

    const cont = document.getElementById('contenedor-preguntas');
    if (!cont) return;

    cont.innerHTML = preguntasDelExamen.map((p, i) => `
        <div style="background:#fff;border-radius:12px;padding:20px;margin-bottom:16px;border-left:4px solid #2ab5b9;box-shadow:0 2px 8px rgba(0,0,0,.05);text-align:left;">
            <h4 style="color:#093c5c;margin:0 0 12px;font-size:1rem;">${i + 1}. ${p.q}</h4>
            <div style="display:flex;flex-direction:column;gap:8px;">
                ${p.op.map((op, j) => `
                    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:9px 13px;border-radius:8px;border:1px solid #e2e8f0;">
                        <input type="radio" name="p${i}" value="${j}" style="accent-color:#2ab5b9;width:17px;height:17px;">
                        <span style="color:#374151;font-size:.95rem;">${op}</span>
                    </label>`).join('')}
            </div>
        </div>`).join('');
}

function calificarExamen() {
    let correctas = 0;

    for (let i = 0; i < preguntasDelExamen.length; i++) {
        const sel = document.querySelector(`input[name="p${i}"]:checked`);
        if (!sel) {
            alert(`Falta responder la pregunta ${i + 1}.`);
            document.querySelector(`input[name="p${i}"]`)?.scrollIntoView({ behavior:'smooth', block:'center' });
            return;
        }
        if (parseInt(sel.value) === preguntasDelExamen[i].c) correctas++;
    }

    mostrarResultado(correctas, correctas >= MINIMO_APROBATORIO);
}

function mostrarResultado(correctas, aprobado) {
    const pct = Math.round((correctas / 15) * 100);

    const icono = document.getElementById('icono-nivel');
    const tit   = document.getElementById('titulo-resultado');
    const txt   = document.getElementById('texto-resultado');
    const modal = document.getElementById('modal-resultado');

    if (icono) icono.innerHTML = aprobado ? '&#127942;' : '&#127793;';
    if (tit)   tit.innerText   = aprobado ? 'Certificado!' : 'Sigue Creciendo';

    if (txt) {
        txt.innerHTML = `
            <b style="font-size:1.6rem;color:${aprobado ? '#4ade80' : '#f87171'};">${correctas}/15</b>
            &nbsp;(${pct}%)<br>
            <span style="font-size:.95rem;">${topicActual}</span><br><br>
            <span style="font-size:.9rem;">${aprobado
                ? 'Tu insignia quedara guardada en tu perfil. Recuerda: el rango Fructificacion solo se gana ensenando.'
                : `No alcanzaste el minimo de ${MINIMO_APROBATORIO}/15. Repasa el tema e intentalo de nuevo.`}</span>`;
    }

    if (modal) modal.style.display = 'flex';

    if (aprobado) guardarCertificacion(topicActual, correctas);
}

async function guardarCertificacion(topico, puntaje) {
    try {
        const fd = new FormData();
        fd.append('topico', topico);
        fd.append('puntaje', puntaje);

        const res  = await fetch('php/guardar_certificacion.php', { method: 'POST', body: fd });
        const data = await res.json();

        const txt = document.getElementById('texto-resultado');
        if (txt) {
            txt.innerHTML += data.success
                ? '<br><br><b style="color:#4ade80;">Insignia guardada en tu perfil.</b>'
                : `<br><br><b style="color:#f87171;">No se pudo guardar: ${data.error || data.mensaje || 'revisa la tabla certificaciones'}</b>`;
        }
    } catch (e) {
        const txt = document.getElementById('texto-resultado');
        if (txt) txt.innerHTML += '<br><br><b style="color:#f87171;">Error de conexion al guardar.</b>';
    }
}

function cerrarModal() {
    const m = document.getElementById('modal-resultado');
    if (m) m.style.display = 'none';
    volverSeleccion();
}

function volverSeleccion() {
    document.getElementById('vista-cuestionario')?.classList.remove('activa');
    document.getElementById('vista-seleccion')?.classList.add('activa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario-test');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            calificarExamen();
        });
    }
});

window.iniciarTest      = iniciarExamen;
window.enviarExamen     = calificarExamen;
window.cerrarModal      = cerrarModal;
window.volverSeleccion  = volverSeleccion;
