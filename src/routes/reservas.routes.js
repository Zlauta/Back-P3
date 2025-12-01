import express from "express";
import { actualizarReserva, crearReserva, eliminarReserva, obtenerReservaPorId, obtenerReservas } from "../controllers/reservas.controller.js";

import { validarReserva } from "../middlewares/validarReserva.middleware.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/", obtenerReservas);

router.get(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(),],
  obtenerReservaPorId
);

router.post("/", validarReserva, crearReserva);

router.put(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(), validarReserva],
  actualizarReserva
);

router.delete(
  "/:id",
  [check("id", "El ID no es válido").isMongoId()],
  eliminarReserva
);

export default router;
