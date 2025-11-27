import { Router } from "express";
import reseniasRoutes from "./resenias.routes.js"
import usuariosRoutes from "./usuarios.routes.js";
import productosRoutes from "./productos.routes.js";
import contactoRoutes from "./contacto.routes.js";
import { validarAutenticacion } from "../middlewares/auth.middleware.js";
import pedidoRoutes from "./pedidos.routes.js"; 


const router = Router();

router.use("/usuarios", usuariosRoutes);
router.use("/productos", productosRoutes);
router.use(
  "/reservas", validarAutenticacion, 

  (await import("./reservas.routes.js")).default
);
router.use("/pedidos", pedidoRoutes);
router.use("/resenias", reseniasRoutes); 
router.use("/contacto", contactoRoutes);


export default router;
