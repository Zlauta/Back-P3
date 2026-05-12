import express from "express";
import {
  actualizarReserva,
  crearReserva,
  eliminarReserva,
  obtenerMisReservas,
  obtenerReservaPorId,
  obtenerReservas,
} from "../controllers/reservas.controller.js";
import { validarReserva } from "../middlewares/validarReserva.middleware.js";
import { check } from "express-validator";
import { validarAutenticacion } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", validarAutenticacion, obtenerReservas);
router.get("/mis", validarAutenticacion, obtenerMisReservas);

router.get(
  "/:id",
  [validarAutenticacion, check("id", "El ID no es válido").isMongoId()],
  obtenerReservaPorId
);

router.post("/", [validarAutenticacion, validarReserva], crearReserva);

router.put(
  "/:id",
  [validarAutenticacion, check("id", "El ID no es válido").isMongoId(), validarReserva],
  actualizarReserva
);

router.delete(
  "/:id",
  [validarAutenticacion, check("id", "El ID no es válido").isMongoId()],
  eliminarReserva
);

export default router;
