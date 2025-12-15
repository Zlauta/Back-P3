import { Router } from "express";
import {
  actualizarContactoController,
  crearContactoController,
  eliminarContactoController,
  obtenerContactoPorIdController,
  obtenerContactosController,
  responderContacto,
} from "../controllers/contacto.controller.js";
import {
  validacionesCrearContacto,
  validacionesEditarContacto,
  validacionesResponderContacto,
} from "../middlewares/validacionContacto.middleware.js";

const router = Router();
  
router.post("/", validacionesCrearContacto, crearContactoController);

router.post("/responder",validacionesResponderContacto, responderContacto);

router.get("/", obtenerContactosController);

router.put("/:id", validacionesEditarContacto, actualizarContactoController);

router.delete("/:id", eliminarContactoController);

router.get("/:id", obtenerContactoPorIdController);

export default router;
