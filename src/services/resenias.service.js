import ReseniaModel from "../models/Resenias.js";
import AppError from "../utils/appError.js";

export const obtenerReseniasService = async () => {
  const resenias = await ReseniaModel.find();
  return {
    msg: "Resenias obtenidas exitosamente",
    statusCode: 200,
    data: resenias,
  };
};

export const obtenerReseniasPorIdService = async (id) => {
  const resenia = await ReseniaModel.findById(id);
  if (!resenia) {
    throw new AppError("Resenia no encontrada", 404);
  }
  return {
    msg: "Resenia obtenida exitosamente",
    statusCode: 200,
    data: resenia,
  };
};

export const crearReseniasService = async (reseniaData) => {
  const nuevaResenia = new ReseniaModel(reseniaData);
  await nuevaResenia.save();
  return {
    msg: "Resenia creada exitosamente",
    statusCode: 201,
    data: nuevaResenia,
  };
};

export const actualizarReseniasService = async (id, reseniaData) => {
  const reseniaActualizada = await ReseniaModel.findByIdAndUpdate(id, reseniaData, {
    new: true,
    runValidators: true,
  });
  if (!reseniaActualizada) {
    throw new AppError("Resenia no encontrada", 404);
  }
  return {
    msg: "Resenia actualizada exitosamente",
    statusCode: 200,
    data: reseniaActualizada,
  };
};

export const eliminarReseniasService = async (id) => {
  const reseniaEliminada = await ReseniaModel.findByIdAndDelete(id);
  if (!reseniaEliminada) {
    throw new AppError("Resenia no encontrada", 404);
  }
  return {
    msg: "Resenia eliminada exitosamente",
    statusCode: 200,
    data: reseniaEliminada,
  };
};
