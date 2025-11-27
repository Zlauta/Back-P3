import { Router } from "express";

import usuariosRoutes from "./usuarios.routes.js";
import productosRoutes from "./productos.routes.js";
import contactoRoutes from "./contacto.routes.js";
import { validarAutenticacion } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/usuarios", usuariosRoutes);

router.use("/productos", productosRoutes);

router.use(
  "/reservas", validarAutenticacion, 

  (await import("./reservas.routes.js")).default
);
router.use("/contacto", contactoRoutes);

export default router;
