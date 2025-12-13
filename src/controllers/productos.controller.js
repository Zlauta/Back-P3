import {
  actualizarProductoService,
  crearProductoService,
  eliminarProductoService,
  obtenerProductoPorIdService,
  obtenerProductosFiltradosService,
  obtenerProductosService,
} from "../services/productos.service.js";

export const obtenerProductosController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await obtenerProductosService();
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const obtenerProductoPorIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await obtenerProductoPorIdService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const crearProductoController = async (req, res, next) => {
  try {
    const { msg, statusCode, data } = await crearProductoService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const actualizarProductoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await actualizarProductoService(id, req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const eliminarProductoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await eliminarProductoService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};

export const obtenerProductosFiltradosController = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const { msg, statusCode, data } = await obtenerProductosFiltradosService(category, page, limit);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    next(error);
  }
};
