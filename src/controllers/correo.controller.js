import { enviarCorreoService } from "../services/correo.service.js";

export const enviarCorreoController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await enviarCorreoService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};
