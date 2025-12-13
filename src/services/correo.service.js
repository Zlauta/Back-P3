import nodemailer from "nodemailer";

const userGmail = process.env.GMAIL_USER;
const passAppGmail = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

export const enviarCorreoService = async (correoData) => {
  const mailOptions = {
    from: "\"El Gourmet\" <" + userGmail + ">",
    to: correoData.to,
    subject: correoData.subject,
    text: correoData.text,
    html: correoData.html,
  };

  const info = await transporter.sendMail(mailOptions);

  if (info.rejected.length > 0) {
    return {
      msg: "Error al enviar correo: destinatarios rechazados",
      statusCode: 400,
      data: info.rejected,
    };
  }
  return {
    msg: "Correo enviado exitosamente",
    statusCode: 200,
    data: info,
  };
};
