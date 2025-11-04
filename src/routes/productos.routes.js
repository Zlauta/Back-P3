import { Router } from "express";
import {
  actualizarProductoController,
  crearProductoController,
  eliminarProductoController,
  obtenerProductoPorIdController,
  obtenerProductosController,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/", obtenerProductosController);

router.get("/:id", obtenerProductoPorIdController);

router.post("/", crearProductoController);

router.put("/:id", actualizarProductoController);

router.delete("/:id", eliminarProductoController);

export default router;
