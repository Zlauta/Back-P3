import ReseniaModel from "../model/resenias.js";

export const obtenerReseniasService = async () => {
  try {
    const resenias = await ReseniaModel.find();
    return {
      msg: "Resenias obtenidas exitosamente",
      statusCode: 200,
      data: resenias,
    };
  } catch (error) {
    return {
      msg: "Error al obtener resenias",
      statusCode: 500,
      data: null,
    };
  }
};

export const obtenerReseniasPorIdService = async (id) => {
  try {
    const resenia = await ReseniaModel.findById(id);
    if (!resenia) {
      return {
        msg: "Resenia no encontrada",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Resenia obtenida exitosamente",
      statusCode: 200,
      data: resenia,
    };
  } catch (error) {
    return {
      msg: "Error al obtener resenia",
      statusCode: 500,
      data: null,
    };
  }
};

export const crearReseniasService = async (reseniaData) => {
  try {
    const nuevaResenia = new ReseniaModel(reseniaData);
    await nuevaResenia.save();
    return {
      msg: "Resenia creada exitosamente",
      statusCode: 201,
      data: nuevaResenia,
    };
  } catch (error) {
    return {
      msg: "Error al crear resenia",
      statusCode: 500,
      data: null,
    };
  }
};

export const actualizarReseniasService = async (id, reseniaData) => {
  try {
    const reseniaActualizada = await ReseniaModel.findByIdAndUpdate(
      id,
      reseniaData,
      { new: true, runValidators: true }
    );
    if (!reseniaActualizada) {
      return {
        msg: "Resenia no encontrada",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Resenia actualizada exitosamente",
      statusCode: 200,
      data: reseniaActualizada,
    };
  } catch (error) {
    return {
      msg: "Error al actualizar resenia",
      statusCode: 500,
      data: null,
    };
  }
};

export const eliminarReseniasService = async (id) => {
  try {
    const reseniaEliminada = await ReseniaModel.findByIdAndDelete(id);
    if (!reseniaEliminada) {
      return {
        msg: "Resenia no encontrada",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Resenia eliminada exitosamente",
      statusCode: 200,
      data: reseniaEliminada,
    };
  } catch (error) {
    return {
      msg: "Error al eliminar resenia",
      statusCode: 500,
      data: null,
    };
  }
};
