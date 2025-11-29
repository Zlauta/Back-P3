import { Router } from "express";
import reseniasRoutes from "./resenias.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import productosRoutes from "./productos.routes.js";
import contactoRoutes from "./contacto.routes.js";
import pedidoRoutes from "./pedidos.routes.js";
import pagosRoutes from "./pagos.routes.js";
import reservasRoutes from "./reservas.routes.js"
import { validarTokenCliente } from "../middlewares/authClient.middleware.js";

const router = Router();

router.use("/usuarios", usuariosRoutes);
router.use("/productos", productosRoutes);
router.use("/reservas",validarTokenCliente,reservasRoutes);
router.use("/pedidos",validarTokenCliente, pedidoRoutes);
router.use("/resenias", reseniasRoutes);
router.use("/contacto", contactoRoutes);
router.use("/pagos",validarTokenCliente, pagosRoutes);

export default router;
