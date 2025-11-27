import { Router } from "express";
import productosRoutes from "./productos.routes.js";
import reseniasRoutes from "./resenias.routes.js"

const router = Router();

router.use("/productos", productosRoutes);

router.use("/resenias", reseniasRoutes); 
export default router;
