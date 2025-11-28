import express from "express";
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
} from "../controllers/reservas.controller.js";

import { validarReserva } from "../middlewares/validarReserva.middleware.js";
import { check } from "express-validator";

const router = express.Router();

/**
 * ✅ GET /api/reservas
 * Lista todas las reservas o permite filtrar por mesa / fecha
 */
router.get("/", getReservas);

/**
 * ✅ GET /api/reservas/:id
 * Obtiene una reserva específica por su ID
 */
router.get(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(),],
  getReservaById
);

/**
 * ✅ POST /api/reservas
 * Crea una nueva reserva (valida todos los campos requeridos)
 */
router.post("/", validarReserva, createReserva);

/**
 * ✅ PUT /api/reservas/:id
 * Actualiza una reserva existente (valida datos y formato de ID)
 */
router.put(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(), validarReserva],
  updateReserva
);

/**
 * ✅ DELETE /api/reservas/:id
 * Elimina una reserva
 */
router.delete(
  "/:id",
  [check("id", "El ID no es válido").isMongoId()],
  deleteReserva
);

export default router;
