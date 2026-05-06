import { enviarCorreoService } from "../services/correo.service.js";

export const enviarCorreoController = async (req, res, next) => {
  try {

   await enviarCorreoService(req.body).catch(() => { });

    res.status(200).json({
      status: "success",
      msg: "El correo se está enviando.",
    });
  } catch (error) {
    next(error);
  }
};