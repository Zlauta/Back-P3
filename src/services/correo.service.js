import nodemailer from "nodemailer";
import AppError from "../utils/appError.js";

const userGmail = process.env.GMAIL_USER;
const passAppGmail = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

export const enviarCorreoService = async (correoData) => {
  const mailOptions = {
    from: '"El Gourmet" <' + userGmail + ">",
    to: correoData.to,
    subject: correoData.subject,
    text: correoData.text,
    html: correoData.html,
  };

  const info = await transporter.sendMail(mailOptions);

  if (info.rejected.length > 0) {
    throw new AppError("Destinatarios rechazados", 400);
  }
  return {
    msg: "Correo enviado exitosamente",
    statusCode: 200,
    data: info,
  };
};