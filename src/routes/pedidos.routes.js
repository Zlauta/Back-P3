import { Router } from "express";
import {
    crear,
    listar,
    obtenerPorId,
    actualizarEstado,
    eliminar,
} from "../controllers/pedido.controller.js";
 
const router = Router();

// Endpoints CRUD para pedidos
router.post("/", crear);                  // Crear un pedido
router.get("/", listar);                  // Listar todos los pedidos
router.get("/:id", obtenerPorId);         // Obtener un pedido por ID
router.patch("/:id/estado", actualizarEstado); // Actualizar estado del pedido
router.delete("/:id", eliminar);          // Eliminar un pedido

export default router;
