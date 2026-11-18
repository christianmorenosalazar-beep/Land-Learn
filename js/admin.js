class AdminDashboardController {
    constructor() {

        this.lblUsuarios = document.getElementById('stat-usuarios');
        this.lblSalas = document.getElementById('stat-salas');
        this.lblReportes = document.getElementById('stat-reportes');

        this.tablaReportes = document.getElementById('tabla-reportes');
    }

    iniciar() {
        this.cargarDashboard();
    }

    async cargarDashboard() {
        try {
            const respuesta = await fetch('php/get_admin_data.php');
            const data = await respuesta.json();

            if (data.error) {
                alert("Error de privilegios: " + data.error);
                window.location.href = 'login.html';
                return;
            }

            if (this.lblUsuarios) this.lblUsuarios.innerText = data.stats.total_usuarios;
            if (this.lblSalas) this.lblSalas.innerText = data.stats.total_salas;
            if (this.lblReportes) this.lblReportes.innerText = data.stats.total_reportes;

            this.renderizarReportes(data.reportes);

        } catch (error) {
            console.error("Fallo del panel administrador:", error);
        }
    }

    renderizarReportes(reportes) {
        if (!this.tablaReportes) return;

        if (!reportes || reportes.length === 0) {
            this.tablaReportes.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2.5rem; color: #64748b; font-style: italic;">
                        🎉 La comunidad está limpia. No hay reportes activos.
                    </td>
                </tr>`;
            return;
        }

        let html = '';
        reportes.forEach(rep => {
            html += `
            <tr style="border-bottom: 1px solid #e2e8f0; background: white; transition: 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                <td style="padding: 15px 20px; font-weight: 600; color: #093c5c;">${rep.nombre_reportador}</td>
                <td style="padding: 15px 20px; color: #ef4444; font-weight: 600;">${rep.nombre_reportado}</td>
                <td style="padding: 15px 20px; color: #475569; font-size: 0.95rem;">${rep.motivo}</td>
                <td style="padding: 15px 20px; color: #64748b; font-size: 0.9rem;">${rep.fecha_reporte}</td>
                <td style="padding: 15px 20px; text-align: center;">
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <button onclick="window.adminApp.moderarCaso(${rep.id_reporte}, 'bloquear')" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">⚠️ Bloquear</button>
                        <button onclick="window.adminApp.moderarCaso(${rep.id_reporte}, 'desestimar')" style="background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">Desestimar</button>
                    </div>
                </td>
            </tr>`;
        });

        this.tablaReportes.innerHTML = html;
    }

    async moderarCaso(idReporte, accion) {
        if (!confirm(`¿Estás seguro de que deseas ${accion} este caso?`)) return;

        try {
            const formData = new FormData();
            formData.append('id_reporte', idReporte);
            formData.append('accion', accion);

            const res = await fetch('php/procesar_reporte.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                alert("Case Cerrado: " + data.mensaje);
                this.cargarDashboard(); 
            } else {
                alert("Error: " + data.mensaje);
            }
        } catch (err) {
            alert("Error de conexión con el servidor.");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.adminApp = new AdminDashboardController();
    window.adminApp.iniciar();
});
