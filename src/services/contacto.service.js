import { contactoModel } from "../models/contacto.js";

export const crearContactoService = async (contactoData) => {
  try {
    const nuevoContacto = new contactoModel(contactoData);
    await nuevoContacto.save();
    return {
      msg: "Contacto creado exitosamente",
      statusCode: 201,
      data: nuevoContacto,
    };
  } catch (error) {
    return {
     msg: `Error al crear contacto: ${
        error?.message || "Error desconocido"
      }`,
      statusCode: 400,
      data: null,
    };
  }
};

export const obtenerContactosService = async () => {
  try {
    const contactos = await contactoModel.find();
    return {
      msg: "Contactos obtenidos exitosamente",
      statusCode: 200,
      data: contactos,
    };
  } catch (error) {
    return {
      msg: `Error al obtener contactos: ${
        error?.message || "Error desconocido"
      }`,
      statusCode: 400,
      data: null,
    };
  }
};

export const obtenerContactoPorIdService = async (id) => {
  try {
    const contacto = await contactoModel.findById(id);
    if (!contacto) {
      return {
        msg: "Contacto no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Contacto obtenido exitosamente",
      statusCode: 200,
      data: contacto,
    };
  } catch (error) {
    return {
      msg: `Error al obtener contacto: ${
        error?.message || "Error desconocido"
      }`,
      statusCode: 400,
      data: null,
    };
  }
};

export const actualizarContactoService = async (id, contactoData) => {
  try {
    const contactoActualizado = await contactoModel.findByIdAndUpdate(
      id,
      contactoData,
      { new: true, runValidators: true }
    );
    if (!contactoActualizado) {
      return {
        msg: "Contacto no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      data: contactoActualizado,
      msg: "Contacto actualizado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: `Error al actualizar contacto: ${
        error?.message || "Error desconocido"
      }`,
      statusCode: 400,
      data: null,
    };
  }
};

export const eliminarContactoService = async (id) => {
  try {
    const contactoEliminado = await contactoModel.findByIdAndDelete(id);
    if (!contactoEliminado) {
      return {
        msg: "Contacto no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Contacto eliminado con éxito",
      statusCode: 200,
      data: contactoEliminado,
    };
  } catch (error) {
    return {
      msg: `Error al eliminar contacto: ${
        error?.message || "Error desconocido"
      }`,
      statusCode: 400,
      data: null,
    };
  }
};