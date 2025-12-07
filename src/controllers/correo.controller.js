import { enviarCorreoService } from "../services/correo.service.js";

export const enviarCorreoController = async (req, res) => {
  try {
    const { msg, statusCode, data } = await enviarCorreoService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al enviar correo" });
  }
};
