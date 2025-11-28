import { Router } from "express";
import reseniasRoutes from "./resenias.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import productosRoutes from "./productos.routes.js";
import contactoRoutes from "./contacto.routes.js";
import pedidoRoutes from "./pedidos.routes.js";
import pagosRoutes from "./pagos.routes.js";
import reservasRoutes from "./reservas.routes.js"

const router = Router();

router.use("/usuarios", usuariosRoutes);
router.use("/productos", productosRoutes);
router.use("/reservas",reservasRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/resenias", reseniasRoutes);
router.use("/contacto", contactoRoutes);
router.use("/pagos", pagosRoutes);

export default router;
