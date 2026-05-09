import ReseniaModel from "../models/resenia.model.js";

export async function verificarDuenoResenia(req, res, next) {
  try {
    const resenia = await ReseniaModel.findById(req.params.id);

    if (!resenia) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    const esAdmin = req.usuario.rol === "admin";
    const esDueno = resenia.usuario?.toString() === req.usuario._id?.toString();

    if (!esAdmin && !esDueno) {
      return res.status(403).json({ msg: "No tenés permiso para esta acción" });
    }

    next();
  } catch (error) {
    next(error);
  }
}