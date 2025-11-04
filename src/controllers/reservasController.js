import * as reservasService from "../services/reservasService.js";

export const createReserva = async (req, res) => {
  try {
    const reserva = await reservasService.createReserva(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const getAllReservas = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const result = await reservasService.getAllReservas(filters, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const getReservaById = async (req, res, ) => {
  try {
    const reserva = await reservasService.getReservaById(req.params.id);
    res.json(reserva);
  } catch (error) {
  return res.status(500).json({ ok: false, error: error.message });
  }
};

export const updateReserva = async (req, res) => {
  try {
    const reserva = await reservasService.updateReserva(req.params.id, req.body);
    res.json(reserva);
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const deleteReserva = async (req, res) => {
  try {
    await reservasService.deleteReserva(req.params.id);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};
