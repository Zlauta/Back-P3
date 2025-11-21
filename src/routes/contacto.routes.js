import { Router } from "express";
import {
  actualizarContactoController,
  crearContactoController,
  eliminarContactoController,
  obtenerContactoPorIdController,
  obtenerContactosController,
} from "../controllers/contacto.controller.js";
import {
  validacionesCrearContacto,
  validacionesEditarContacto,
} from "../middlewares/validacionContacto.middleware.js";

const router = Router();

router.post("/", validacionesCrearContacto, crearContactoController);

router.get("/", obtenerContactosController);

router.put("/:id", validacionesEditarContacto, actualizarContactoController);

router.delete("/:id", eliminarContactoController);

router.get("/:id", obtenerContactoPorIdController);

export default router;
