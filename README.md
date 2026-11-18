# Land Learn

Plataforma web para que estudiantes intercambien conocimientos entre ellos: tú enseñas lo que sabes y aprendes lo que te falta, sin dinero de por medio. Es un "trueque" de habilidades.

Proyecto integrador desarrollado por **Christian Moreno Salazar** (backend y frontend).

## Qué hace

- **Registro e inicio de sesión** con contraseñas cifradas (bcrypt) y bloqueo temporal después de varios intentos fallidos
- **Recuperación de contraseña** con enlaces que caducan
- **Perfil de usuario** con habilidades, biografía, disponibilidad y nivel de experiencia
- **Motor de matches** que sugiere con quién hacer intercambio según lo que cada quien enseña y quiere aprender
- **Salas de trueque** con chat en tiempo casi real, usuarios conectados y lista de tareas compartida
- **Chat de acuerdos** para quedar en los detalles de cada intercambio
- **Evaluaciones y certificaciones** al terminar un intercambio
- **Comunidad y notificaciones**
- **Reportes** de mala conducta y **panel de administración** para revisarlos

## Tecnologías

- PHP con MySQL/MariaDB (consultas preparadas con `mysqli`)
- JavaScript sin frameworks, organizado en módulos por pantalla
- HTML y CSS propios, con diseño adaptable a celular
- Protección CSRF en los formularios
- Actualización periódica de chats que se hace más lenta cuando la pestaña no está visible, para no cargar el servidor

## Cómo correrlo en tu computadora

1. Instala [XAMPP](https://www.apachefriends.org/) o cualquier servidor con PHP y MySQL.
2. Copia la carpeta del proyecto dentro de `htdocs`.
3. En phpMyAdmin crea una base de datos llamada `integradora_v2` e importa `sql/integradora_v2.sql`.
4. Copia `php/config.example.php` como `php/config.php` y pon tus datos de conexión.
5. Abre `http://localhost/<carpeta-del-proyecto>/index2.html`.

Para tener una cuenta de administrador, regístrate desde la página y después cambia el correo en la última parte de `sql/ACTUALIZAR_BD_SIN_BORRAR.sql` por el tuyo y ejecútalo.

## Estructura

```
├── *.html        Pantallas de la aplicación
├── css/          Estilos por pantalla
├── js/           Lógica del cliente
├── php/          API del servidor (sesión, matches, chats, salas, admin)
├── img/          Imágenes
└── sql/          Base de datos (estructura y catálogos, sin datos de usuarios)
```

## Contacto

Christian Moreno Salazar, desarrollador web y de software en el Estado de México.
