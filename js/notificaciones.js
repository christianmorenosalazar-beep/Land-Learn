document.addEventListener('DOMContentLoaded', () => {
    cargarSolicitudes();
});

async function cargarSolicitudes() {
    const contenedor = document.getElementById('contenedor-solicitudes');
    try {
        const res = await fetch('php/get_notificaciones.php');
        const solicitudes = await res.json();

        if (solicitudes.error) {
            contenedor.innerHTML = `<p style="color:#ef4444; text-align:center;">${solicitudes.error}</p>`;
            return;
        }

        if (solicitudes.length === 0) {
            contenedor.innerHTML = `
                <div style="background: white; padding: 3rem; border-radius: 15px; text-align: center; color: #64748b; border: 1px dashed #d1e9ea;">
                    <i class="fa-regular fa-envelope-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem; margin: 0; color: #093c5c; font-weight: bold;">Tu buzón está limpio.</p>
                    <p>No tienes propuestas pendientes por el momento.</p>
                </div>`;
            return;
        }

        let html = '';
        solicitudes.forEach(sol => {
            html += `
            <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.02); border: 1px solid #d1e9ea; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="margin:0; color:#093c5c; font-family:'Poppins';">${sol.nombre_remitente}</h3>
                    <p style="margin: 5px 0; color:#64748b;">Te ofrece: <b style="color:#2ab5b9;">${sol.habilidad_ofrecida}</b></p>
                    <p style="margin: 0; color:#64748b;">A cambio de: <b>${sol.habilidad_buscada}</b></p>
                </div>
                <div style="display:flex; gap: 10px;">
                    <button onclick="responderSolicitud(${sol.id_intercambio}, 'aceptar', this)" style="background:#2ab5b9; color:white; border:none; padding:10px 15px; border-radius:8px; font-weight:bold; cursor:pointer;">🤝 Aceptar</button>
                    <button onclick="responderSolicitud(${sol.id_intercambio}, 'rechazar', this)" style="background:transparent; color:#ef4444; border:1px solid #ef4444; padding:10px 15px; border-radius:8px; font-weight:bold; cursor:pointer;">❌</button>
                </div>
            </div>`;
        });
        contenedor.innerHTML = html;

    } catch (err) {
        contenedor.innerHTML = `<p style="color:#ef4444; text-align:center;">Fallo de conexión.</p>`;
    }
}

async function responderSolicitud(idIntercambio, accion, boton) {
    boton.disabled = true;
    try {
        const formData = new FormData();
        formData.append('id_intercambio', idIntercambio);
        formData.append('accion', accion);

        const res = await fetch('php/procesar_propuesta.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        if (data.success) {
            alert("🍄 " + data.mensaje);
            cargarSolicitudes(); 
        } else {
            alert("Error: " + data.mensaje);
            boton.disabled = false;
        }
    } catch (err) {
        alert("Error de red.");
        boton.disabled = false;
    }
}
