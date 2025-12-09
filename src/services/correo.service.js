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
  try {
    const mailOptions = {
      from: '"El Gourmet" <' + userGmail + ">",
      to: correoData.to,
      subject: correoData.subject,
      text: correoData.text,
      html: correoData.html,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      msg: "Correo enviado exitosamente",
      statusCode: 200,
      data: info,
    };
  } catch (error) {
    return {
      msg: "Error al enviar correo",
      statusCode: 400,
      data: error.message,
    };
  }
};
