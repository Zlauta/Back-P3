import Reserva from "../models/Reserva.js";
import Usuario from "../models/Usuario.js";
import { generarTemplatesCorreo } from "../utils/template.js";
import { enviarCorreoService } from "./correo.service.js";

export const obtenerReservas = async (filtros = {}) => {
  try {
    const query = {};
    if (filtros.fecha) query.fecha = filtros.fecha;
    if (filtros.mesa) query.mesa = filtros.mesa;

    const reservas = await Reserva.find(query)
      .populate("usuario", "nombre email")
      .sort({ fecha: 1, hora: 1 });

    return { status: 200, data: reservas };
  } catch (error) {
    throw {
      status: 500,
      message: "Error al obtener las reservas",
      details: error.message,
    };
  }
};

export const obtenerReservaPorId = async (id) => {
  try {
    const reserva = await Reserva.findById(id).populate(
      "usuario",
      "nombre email"
    );
    if (!reserva) throw { status: 404, message: "Reserva no encontrada" };
    return { status: 200, data: reserva };
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Error al obtener la reserva" };
  }
};

export const crearReserva = async (datosReserva, usuarioToken) => {
  try {
    const { mesa, fecha, hora } = datosReserva;

    const usuarioReal = await Usuario.findOne({ email: usuarioToken.email });

    if (!usuarioReal) {
      throw {
        status: 404,
        message: "Usuario no encontrado. Por favor inicie sesión nuevamente.",
      };
    }

    const reservaExistente = await Reserva.findOne({ mesa, fecha, hora });
    if (reservaExistente) {
      throw {
        status: 400,
        message: "La mesa ya está reservada para esa fecha y hora.",
      };
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
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      throw {
        status: 400,
        message: "Error de validación",
        details: mensajes,
      };
    }
    if (error.code === 11000) {
      throw {
        status: 400,
        message: "La mesa ya está reservada para esa fecha y hora",
      };
    }
    throw error.status
      ? error
      : {
          status: 500,
          message: "Error al crear la reserva",
          details: error.message,
        };
  }
};

export const actualizarReserva = async (id, datos) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(id, datos, { new: true });
    if (!reserva) throw { status: 404, message: "Reserva no encontrada" };
    return { status: 200, data: reserva };
  } catch (error) {
    throw error.status
      ? error
      : { status: 500, message: "Error al actualizar" };
  }
};

export const eliminarReserva = async (id) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(id);
    if (!reserva) throw { status: 404, message: "Reserva no encontrada" };
    return { status: 204, data: null };
  } catch (error) {
    throw error.status ? error : { status: 500, message: "Error al eliminar" };
  }
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
