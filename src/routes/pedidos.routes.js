import { Router } from "express";
import {
  crear,
  listar,
  obtenerPorId,
  eliminar,
  cambiarEstadoAdmin,
  editarPedido,
} from "../controllers/pedido.controller.js";
import { validarAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", crear);
router.get("/", listar);
router.get("/:id", obtenerPorId);
router.put("/:id", editarPedido);
router.patch("/:id/estado", validarAdmin, cambiarEstadoAdmin);
router.delete("/:id", eliminar);

export default router;
