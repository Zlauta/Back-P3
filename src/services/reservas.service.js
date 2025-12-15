import Reserva from "../models/Reserva.js";
import Usuario from "../models/Usuario.js";
import AppError from "../utils/appError.js";
import { generarTemplatesCorreo } from "../utils/template.reservas.js";
import { enviarCorreoService } from "./correo.service.js";

export const obtenerReservas = async (filtros = {}) => {
  const query = {};
  if (filtros.fecha) {
    query.fecha = filtros.fecha;
  }
  if (filtros.mesa) {
    query.mesa = filtros.mesa;
  }

  const reservas = await Reserva.find(query)
    .populate("usuario", "nombre email")
    .sort({ fecha: 1, hora: 1 });

  return { status: 200, data: reservas };
};

export const obtenerReservaPorId = async (id) => {
  const reserva = await Reserva.findById(id).populate("usuario", "nombre email");
  if (!reserva) {
    throw new AppError("Reserva no encontrada", 404);
  }
  return { status: 200, data: reserva };
};

export const crearReserva = async (datosReserva, usuarioToken) => {
  const { mesa, fecha, hora } = datosReserva;

  const usuarioReal = await Usuario.findOne({ email: usuarioToken.email });

  if (!usuarioReal) {
    throw new AppError("Usuario no encontrado. Por favor inicie sesión nuevamente.", 404);
  }

  const reservaExistente = await Reserva.findOne({ mesa, fecha, hora });
  if (reservaExistente) {
    throw new AppError("La mesa ya está reservada para esa fecha y hora.", 400);
  }

  const nuevaReserva = new Reserva({
    ...datosReserva,
    usuario: usuarioReal._id,
  });

  await nuevaReserva.save();

  let resultadoCorreo = {
    enviado: false,
    mensaje: "No se pudo enviar el correo",
  };

  try {
    const correoData = generarTemplatesCorreo(
      usuarioToken.email,
      usuarioToken.nombre,
      fecha,
      hora,
      mesa,
      datosReserva.cantidadPersonas
    );

    const envio = await enviarCorreoService(correoData);

    resultadoCorreo = {
      enviado: envio.statusCode === 200,
      mensaje: envio.msg,
    };
  } catch (errorCorreo) {
    console.error("Error al enviar correo:", errorCorreo.message);
  }

  return {
    status: 201,
    data: nuevaReserva,
    correo: resultadoCorreo,
  };
};

export const actualizarReserva = async (id, datos) => {
  const reserva = await Reserva.findByIdAndUpdate(id, datos, { new: true });
  if (!reserva) {
    throw new AppError("Reserva no encontrada", 404);
  }
  return { status: 200, data: reserva };
};

export const eliminarReserva = async (id) => {
  const reserva = await Reserva.findByIdAndDelete(id);
  if (!reserva) {
    throw new AppError("Reserva no encontrada", 404);
  }
  return { status: 204, data: null };
};

export const obtenerMisReservas = async (filtros = {}) => {
  try {
    const query = {};
    if (filtros.email) {
      const usuario = await Usuario.findOne({ email: filtros.email });
      if (usuario) {
        query.usuario = usuario._id; // 👈 usar el id encontrado
      } else {
        // Si no existe el usuario, devolver array vacío
        return { status: 200, data: [] };
      }
    }
    if (filtros.fecha) query.fecha = { $gte: filtros.fecha };

    const reservas = await Reserva.find(query)
      .populate("usuario", "nombre email")
      .sort({ fecha: 1, hora: 1 });

    return { status: 200, data: reservas };
  } catch (error) {
    throw {
      status: 500,
      message: "Error al obtener mis reservas",
      details: error.message,
    };
  }
};
