import contactoModel from "../models/Contacto.js";
import AppError from "../utils/appError.js";
import { generarTemplateRespuestaContacto } from "../utils/template.contactos.js";
import { enviarCorreoService } from "./correo.service.js";

export const crearContactoService = async (contactoData) => {
  const nuevoContacto = new contactoModel(contactoData);
  await nuevoContacto.save();
  return {
    msg: "Contacto creado exitosamente",
    statusCode: 201,
    data: nuevoContacto,
  };
};

export const obtenerContactosService = async () => {
  const contactos = await contactoModel.find();
  return {
    msg: "Contactos obtenidos exitosamente",
    statusCode: 200,
    data: contactos,
  };
};

export const obtenerContactoPorIdService = async (id) => {
  const contacto = await contactoModel.findById(id);
  if (!contacto) {
    throw new AppError("Contacto no encontrado", 404);
  }
  return {
    msg: "Contacto obtenido exitosamente",
    statusCode: 200,
    data: contacto,
  };
};

export const actualizarContactoService = async (id, contactoData) => {
  const contactoActualizado = await contactoModel.findByIdAndUpdate(id, contactoData, {
    new: true,
    runValidators: true,
  });
  if (!contactoActualizado) {
    throw new AppError("Contacto no encontrado", 404);
  }
  return {
    data: contactoActualizado,
    msg: "Contacto actualizado con exito",
    statusCode: 200,
  };
};

export const eliminarContactoService = async (id) => {
  const contactoEliminado = await contactoModel.findByIdAndDelete(id);
  if (!contactoEliminado) {
    throw new AppError("Contacto no encontrado", 404);
  }
  return {
    msg: "Contacto eliminado con éxito",
    statusCode: 200,
    data: contactoEliminado,
  };
};

export const enviarRespuestaEmail = async ({ emailDestino, nombre, asunto, mensaje }) => {
  if (!emailDestino || !mensaje || !asunto) {
    throw new AppError("Faltan datos obligatorios: Email, Asunto o Mensaje.", 400);
  }

  try {
    const mailOptions = generarTemplateRespuestaContacto(emailDestino, nombre, asunto, mensaje);

    const info = await enviarCorreoService(mailOptions);
    return info;
  } catch (error) {
    console.error("Error interno al enviar email:", error);
    if (error instanceof AppError) throw error;

    throw new AppError("No se pudo enviar el correo. Intente más tarde.", 500);
  }
};
