export function generarTemplatesCorreo(
  email,
  nombre,
  fecha,
  hora,
  mesa,
  cantidadPersonas
) {
  const formatearFecha = (fechaInput) => {
    const fecha = new Date(fechaInput);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  const correoData = {
    to: email,
    subject: "Confirmación de Reserva",
    text: `Hola ${nombre || "cliente"}, 
        Nos alegra informarte que tu reserva ha sido confirmada con éxito. 
Aquí están los detalles:

📅 Fecha: ${formatearFecha(fecha)}
⏰ Hora: ${hora}
🍽️ Mesa: ${mesa}
👥 Cantidad de personas: ${cantidadPersonas}

Te esperamos para que disfrutes de una experiencia única en nuestro restaurante.  
Si necesitás modificar o cancelar tu reserva, por favor contáctanos con anticipación.

¡Gracias por elegirnos!  
El equipo de El Gourmet
`,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color:#1aaf4b;">¡Hola ${nombre || "cliente"}!</h2>
      <p>Nos alegra informarte que tu <strong>reserva ha sido confirmada</strong> con éxito. Aquí están los detalles:</p>
      <ul>
        <li><strong>📅 Fecha:</strong> ${formatearFecha(fecha)}</li>
        <li><strong>⏰ Hora:</strong> ${hora}</li>
        <li><strong>🍽️ Mesa:</strong> ${mesa}</li>
        <li><strong>👥 Personas:</strong> ${cantidadPersonas}</li>
      </ul>
      <p>Te esperamos para que disfrutes de una experiencia única en nuestro restaurante.</p>
      <p style="margin-top:20px;">Si necesitás modificar o cancelar tu reserva, por favor contáctanos con anticipación.</p>
      <p style="color:#1aaf4b; font-weight:bold;">¡Gracias por elegirnos!<br/>El equipo de El Gourmet</p>
    </div>`,
  };
  return correoData;
}
