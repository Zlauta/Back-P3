// helpers/plantillasCorreo.js

export function generarTemplateRespuestaContacto(email, nombre, asunto, mensajeRespuesta) {
  const mensajeFormateado = mensajeRespuesta.replace(/\n/g, '<br>');

  const correoData = {
    from: `"Soporte El Gourmet" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Respuesta a: ${asunto}`,
    text: `Hola ${nombre || "Cliente"},\n\nGracias por contactarnos. Hemos recibido tu consulta sobre "${asunto}".\n\nRespuesta:\n${mensajeRespuesta}\n\nSaludos,\nEl equipo de El Gourmet`,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1aaf4b; padding: 20px; text-align: center;">
        <h2 style="color: #fff; margin: 0;">Respuesta a tu consulta</h2>
      </div>
      <div style="padding: 20px;">
        <h3 style="color:#1aaf4b; margin-top: 0;">¡Hola ${nombre || "Cliente"}!</h3>
        <p>Esperamos que estés muy bien. Te escribimos en respuesta a tu mensaje sobre: <strong>"${asunto}"</strong>.</p>
        <div style="background-color: #f9f9f9; border-left: 4px solid #1aaf4b; padding: 15px; margin: 20px 0; font-style: italic;">
          ${mensajeFormateado}
        </div>
        <p>Si tienes más dudas, no dudes en responder a este correo o contactarnos nuevamente.</p>
      </div>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;"><strong>El equipo de El Gourmet</strong></p>
      </div>
    </div>`,
  };

  return correoData;
}