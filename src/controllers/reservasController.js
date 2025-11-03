import * as reservasService from "../services/reservasService.js";

export const createReserva = async (req, res, next) => {
  try {
    const reserva = await reservasService.createReserva(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    next(error);
  }
};

export const getAllReservas = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const result = await reservasService.getAllReservas(filters, Number(page), Number(limit));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getReservaById = async (req, res, next) => {
  try {
    const reserva = await reservasService.getReservaById(req.params.id);
    res.json(reserva);
  } catch (error) {
    next(error);
  }
};

export const updateReserva = async (req, res, next) => {
  try {
    const reserva = await reservasService.updateReserva(req.params.id, req.body);
    res.json(reserva);
  } catch (error) {
    next(error);
  }
};

export const deleteReserva = async (req, res, next) => {
  try {
    await reservasService.deleteReserva(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
