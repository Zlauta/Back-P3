import { Router } from "express";
import {
  actualizarProductoController,
  crearProductoController,
  eliminarProductoController,
  obtenerProductoPorIdController,
  obtenerProductosController,
  obtenerProductosFiltradosController,
} from "../controllers/productos.controller.js";
import {
  validacionesCrearProducto,
  validacionesEditarProducto,
} from "../middlewares/validacionProductos.middleware.js";
import { validarAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", obtenerProductosController);

router.get("/filtrados", obtenerProductosFiltradosController);

router.get("/:id", obtenerProductoPorIdController);

router.post("/", validacionesCrearProducto, validarAdmin, crearProductoController);

router.put("/:id", validacionesEditarProducto, validarAdmin, actualizarProductoController);

router.delete("/:id", validarAdmin, eliminarProductoController);

export default router;
