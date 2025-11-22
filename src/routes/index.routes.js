import { Router } from "express";

import usuariosRoutes from "./usuarios.routes.js";
import productosRoutes from "./productos.routes.js";
import contactoRoutes from "./contacto.routes.js"; 

const router = Router();

router.use("/usuarios", usuariosRoutes);

router.use("/productos", productosRoutes);

router.use("/reservas", (await import("./reservas.routes.js")).default);
router.use("/contacto", contactoRoutes);

export default router;
