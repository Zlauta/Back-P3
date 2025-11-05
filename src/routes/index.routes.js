import { Router } from "express";

import usuariosRoutes from "./usuarios.routes.js";

import productosRoutes from "./productos.routes.js";

const router = Router();

router.use("/usuarios", usuariosRoutes);

router.use("/productos", productosRoutes);

export default router;
