import * as reservasService from "../services/reservas.service.js";

export const getReservas = async (req, res, next) => {
  try {
    const { status, data } = await reservasService.getReservas(req.query);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getReservaById = async (req, res) => {
  try {
    const { status, data } = await reservasService.getReservaById(
      req.params.id
    );
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const createReserva = async (req, res) => {
  try {
    const { status, data } = await reservasService.createReserva(req.body);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
export const postReserva = async (req, res) => {
  try {
    const result = await createReserva(req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error("❌ Error al crear reserva:", error); // ya lo estás viendo en la consola
    res.status(error.status || 500).json({
      message: error.message || "estoy aqui",
      details: error.details || error.message || error,
    });
  }
};

export const updateReserva = async (req, res) => {
  try {
    const { status, data } = await reservasService.updateReserva(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteReserva = async (req, res) => {
  try {
    const { status, data } = await reservasService.deleteReserva(req.params.id);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
