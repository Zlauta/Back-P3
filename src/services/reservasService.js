import Reserva from "../models/Reserva.js";

export const getReservas = async (filters = {}) => {
  try {
    const query = {};

    if (filters.fecha) query.fecha = filters.fecha;
    if (filters.mesa) query.mesa = filters.mesa;

    const reservas = await Reserva.find(query).sort({ fecha: 1, hora: 1 });

    return { status: 200, data: reservas };
  } catch (error) {
    throw {
      status: 500,
      message: "Error al obtener las reservas",
      details: error.message,
    };
  }
};

export const getReservaById = async (id) => {
  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) throw { status: 404, message: "Reserva no encontrada" };
    return { status: 200, data: reserva };
  } catch (error) {
    throw error.status
      ? error
      : {
          status: 500,
          message: "Error al obtener la reserva",
          details: error.message,
        };
  }
};

export const createReserva = async (data) => {
  try {
    const reserva = new Reserva(data);
    await reserva.save();
    return { status: 201, data: reserva };
  } catch (error) {
    if (error.code === 11000) {
      // índice único: mesa duplicada en mismo horario
      throw {
        status: 400,
        message: "La mesa ya está reservada para esa fecha y hora",
      };
    }
    throw {
      status: 500,
      message: "Error al crear la reserva",
      details: error.message,
    };
  }
};

export const updateReserva = async (id, data) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(id, data, { new: true });
    if (!reserva)
      throw { status: 404, message: "Reserva no encontrada para actualizar" };
    return { status: 200, data: reserva };
  } catch (error) {
    if (error.code === 11000) {
      throw {
        status: 400,
        message: "Ya existe otra reserva con esa mesa, fecha y hora",
      };
    }
    throw error.status
      ? error
      : {
          status: 500,
          message: "Error al actualizar la reserva",
          details: error.message,
        };
  }
};

export const deleteReserva = async (id) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(id);
    if (!reserva)
      throw { status: 404, message: "Reserva no encontrada para eliminar" };
    return { status: 204, data: null };
  } catch (error) {
    throw error.status
      ? error
      : {
          status: 500,
          message: "Error al eliminar la reserva",
          details: error.message,
        };
  }
};
