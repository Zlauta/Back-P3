import { Router } from "express";
import { enviarCorreoController } from "../controllers/correo.controller.js";

const router = Router();

router.post("/", enviarCorreoController);

export default router;
