import { actualizarReseniasService, crearReseniasService, eliminarReseniasService, obtenerReseniasPorIdService, obtenerReseniasService } from "../services/resenias.service.js";



export const obtenerReseniasController = async (req, res) => {
  try {
    const { msg, statusCode, data } = await obtenerReseniasService();
    res.status(statusCode).json({msg, data});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener reseñas" });
  }
};

export const obtenerReseniaPorIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await obtenerReseniasPorIdService(id);
    res.status(statusCode).json({msg, data});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener reseña" });
  }
};

export const crearReseniasController = async (req, res) => {
  try {
    const { msg, statusCode, data } = await crearReseniasService(req.body);
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(400).json({ msg: "Error al crear reseña" });
  }
};

export const actualizarReseniasController = async (req, res) => {
  try {
    const actualizada = await actualizarReseniasService(req.params.id, req.body);
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar reseña" });
  }
};

export const eliminarReseniasController = async (req, res) => {
  try {
    await eliminarReseniasService(req.params.id);
    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar reseña" });
  }
};
