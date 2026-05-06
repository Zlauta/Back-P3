import Reserva from "../models/Reserva.js";
import Usuario from "../models/Usuario.js";
import AppError from "../utils/appError.js";
import { generarTemplatesCorreo } from "../utils/template.reservas.js";
import { enviarCorreoService } from "./correo.service.js";

// Función auxiliar para convertir "HH:mm" a minutos totales
const convertirAMinutos = (horaString) => {
  const [horas, minutos] = horaString.split(":").map(Number);
  return horas * 60 + minutos;
};

export const obtenerReservas = async (filtros = {}) => {
  const query = {};
  if (filtros.fecha) query.fecha = filtros.fecha;
  if (filtros.mesa) query.mesa = filtros.mesa;

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

  const inicioDia = new Date(fecha);
  inicioDia.setUTCHours(0, 0, 0, 0);
  const finDia = new Date(fecha);
  finDia.setUTCHours(23, 59, 59, 999);

  const reservasMismoDia = await Reserva.find({
    mesa,
    fecha: { $gte: inicioDia, $lte: finDia },
  });

  const minutosNuevaReserva = convertirAMinutos(hora);

  const hayConflicto = reservasMismoDia.some((reserva) => {
    const minutosReservaExistente = convertirAMinutos(reserva.hora);
    return Math.abs(minutosNuevaReserva - minutosReservaExistente) < 120;
  });

  if (hayConflicto) {
    throw new AppError(
      "La mesa ya está reservada o el horario está muy próximo a otra reserva (se requieren 2 horas de diferencia).",
      400
    );
  }

  const nuevaReserva = new Reserva({
    ...datosReserva,
    usuario: usuarioReal._id,
  });

  await nuevaReserva.save();

  try {
    const correoData = generarTemplatesCorreo(
      usuarioToken.email,
      usuarioToken.nombre,
      fecha,
      hora,
      mesa,
      datosReserva.cantidadPersonas
    );

    enviarCorreoService(correoData)
      .then(() => console.log(`Correo enviado en segundo plano a ${usuarioToken.email}`))
      .catch((err) => console.error("Error enviando correo en segundo plano:", err));
  } catch (errorCorreo) {
    console.error("Error generando template de correo:", errorCorreo.message);
  }

  return {
    status: 201,
    data: nuevaReserva,
    mensaje: "Reserva creada con éxito. La confirmación llegará a su correo en breve.",
  };
};

export const actualizarReserva = async (id, datos) => {
  const reservaExistente = await Reserva.findById(id);
  if (!reservaExistente) {
    throw new AppError("Reserva no encontrada", 404);
  }
  const camposPermitidos = ["mesa", "fecha", "hora", "cantidadPersonas"];
  const camposActualizados = Object.keys(datos);
  const esValido = camposActualizados.every((campo) => camposPermitidos.includes(campo));
  if (!esValido) {
    throw new AppError("Campos no permitidos en la actualización", 400);
  }
  const mesaDestino = datos.mesa || reservaExistente.mesa;
  const fechaDestino = datos.fecha || reservaExistente.fecha;
  const horaDestino = datos.hora || reservaExistente.hora;

  const inicioDia = new Date(fechaDestino);
  inicioDia.setUTCHours(0, 0, 0, 0);
  const finDia = new Date(fechaDestino);
  finDia.setUTCHours(23, 59, 59, 999);

  const reservasMismoDia = await Reserva.find({
    mesa: mesaDestino,
    fecha: { $gte: inicioDia, $lte: finDia },
    _id :{ $ne: id },
  });

  const minutosNuevaReserva = convertirAMinutos(horaDestino);

  const hayConflicto = reservasMismoDia.some((reserva) => {
    const minutosReservaOcupada = convertirAMinutos(reserva.hora);
    return Math.abs(minutosNuevaReserva - minutosReservaOcupada) < 120;
  });

  if (hayConflicto) {
    throw new AppError(
      "La mesa ya está reservada o el horario está muy próximo a otra reserva (se requieren 2 horas de diferencia).",
      400
    );
  }

  const reservaActualizada = await Reserva.findByIdAndUpdate(id, datos, { new: true });

  return { status: 200, data: reservaActualizada };
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
        query.usuario = usuario._id;
      } else {
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
