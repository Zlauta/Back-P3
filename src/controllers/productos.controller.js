import {
  actualizarProductoService,
  crearProductoService,
  eliminarProductoService,
  obtenerProductoPorIdService,
  obtenerProductosService,
} from "../services/productos.service.js";

export const obtenerProductosController = async (req, res) => {
  try {
    const { msg, statusCode, data } = await obtenerProductosService();
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener productos" });
  }
};

export const obtenerProductoPorIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await obtenerProductoPorIdService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener producto" });
  }
};

export const crearProductoController = async (req, res) => {
  try {
    const { msg, statusCode, data } = await crearProductoService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al crear producto" });
  }
};

export const actualizarProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await actualizarProductoService(id, req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar producto" });
  }
};

export const eliminarProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await eliminarProductoService(id);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar producto" });
  }
};
