import {
  actualizarReseniasService,
  crearReseniasService,
  eliminarReseniasService,
  obtenerReseniasPorIdService,
  obtenerReseniasService,
} from "../services/resenias.service.js";

export const obtenerReseniasController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await obtenerReseniasService();
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const obtenerReseniaPorIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await obtenerReseniasPorIdService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const crearReseniasController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await crearReseniasService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const actualizarReseniasController = async (req, res, next) => {
  try {
    const actualizada = await actualizarReseniasService(req.params.id, req.body);
    res.status(200).json(actualizada);
  } catch (error) {
    next(error);
  }
};

export const eliminarReseniasController = async (req, res, next) => {
  try {
    await eliminarReseniasService(req.params.id);
    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};
