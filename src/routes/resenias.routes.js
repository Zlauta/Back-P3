import { Router } from "express";
import {
  obtenerReseniasController,
  obtenerReseniaPorIdController,
  crearReseniasController,
  actualizarReseniasController,
  eliminarReseniasController,
} from "../controllers/resenias.controller.js";
import {
  validacionesCrearResenia,
  validacionesEditarResenia,
} from "../middlewares/validacionResenias.middleware.js";
import { validarAutenticacion, validarAutenticacionOpcional } from "../middlewares/auth.middleware.js";
import { verificarDuenoResenia } from "../middlewares/verificarDuenoResenia.middleware.js";

const router = Router();

router.get("/", obtenerReseniasController);
router.get("/:id", obtenerReseniaPorIdController);
router.post("/", validarAutenticacionOpcional, validacionesCrearResenia, crearReseniasController);
router.put("/:id", validarAutenticacion, verificarDuenoResenia, validacionesEditarResenia, actualizarReseniasController);
router.delete("/:id", validarAutenticacion, verificarDuenoResenia, eliminarReseniasController);

export default router;