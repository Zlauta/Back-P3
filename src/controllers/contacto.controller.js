import {
  actualizarContactoService,
  crearContactoService,
  eliminarContactoService,
  enviarRespuestaEmail,
  obtenerContactoPorIdService,
  obtenerContactosService,
} from "../services/contacto.service.js";

export const crearContactoController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await crearContactoService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const obtenerContactosController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await obtenerContactosService();
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const obtenerContactoPorIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await obtenerContactoPorIdService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const actualizarContactoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await actualizarContactoService(id, req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const eliminarContactoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await eliminarContactoService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const responderContacto = async (req, res, next) => {
  try {
    const { emailDestino, nombre, asunto, mensaje } = req.body;

    enviarRespuestaEmail({
      emailDestino,
      nombre,
      asunto,
      mensaje,
    }).catch(() => {});

    res.status(200).json({
      status: "success",
      msg: "La respuesta se está procesando en segundo plano",
      
    });
  } catch (error) {
    next(error);
  }
};
