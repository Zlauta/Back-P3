import { Router } from "express";

import usuariosRoutes from "./usuarios.routes.js";
import productosRoutes from "./productos.routes.js";
import contactoRoutes from "./contacto.routes.js"; 
import pedidoRoutes from "./pedidos.routes.js"; 

const router = Router();

router.use("/usuarios", usuariosRoutes);

router.use("/productos", productosRoutes);
router.use("/pedidos", pedidoRoutes);

router.use("/reservas", (await import("./reservas.routes.js")).default);
router.use("/contacto", contactoRoutes);

export default router;
