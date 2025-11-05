import { Router } from "express";
import {
  actualizarProductoController,
  crearProductoController,
  eliminarProductoController,
  obtenerProductoPorIdController,
  obtenerProductosController,
} from "../controllers/productos.controller.js";
import {
  validacionesCrearProducto,
  validacionesEditarProducto,
} from "../middlewares/validacionProductos.middleware.js";

const router = Router();

router.get("/", obtenerProductosController);

router.get("/:id", obtenerProductoPorIdController);

router.post("/", validacionesCrearProducto, crearProductoController);

router.put("/:id", validacionesEditarProducto, actualizarProductoController);

router.delete("/:id", eliminarProductoController);

export default router;
