import { Router } from "express";
import {
  obtenerReseniasController,
  obtenerReseniaPorIdController,
  crearReseniasController,
  actualizarReseniasController,
  eliminarReseniasController,
} from "../controller/resenias.controller.js";
import { validacionesCrearResenia, validacionesEditarResenia } from "../middleware/validacionResenias.middleware.js";

const router = Router();

router.get("/", obtenerReseniasController);
router.get("/:id", obtenerReseniaPorIdController);
router.post("/",validacionesCrearResenia, crearReseniasController);
router.put("/:id",validacionesEditarResenia, actualizarReseniasController);
router.delete("/:id", eliminarReseniasController);

export default router;
