import { Router } from "express";
import {
  crear,
  listar,
  obtenerPorId,
  eliminar,
  cambiarEstadoAdmin,
  editarPedido,
} from "../controllers/pedido.controller.js";
import { validarAdmin, validarAutenticacion } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validarAutenticacion, crear);
router.get("/", validarAutenticacion, listar);
router.get("/:id", validarAutenticacion, obtenerPorId);
router.put("/:id", validarAutenticacion, editarPedido);
router.delete("/:id", validarAutenticacion, eliminar);

router.patch("/:id/estado", validarAdmin, cambiarEstadoAdmin);

export default router;