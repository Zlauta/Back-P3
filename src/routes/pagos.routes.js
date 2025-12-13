import { Router } from "express";
import { crearPreferencia, recibirWebhook } from "../controllers/pagos.controller.js";
import { validarTokenCliente } from "../middlewares/authClient.middleware.js";

const router = Router();

router.post("/crear-preferencia", validarTokenCliente, crearPreferencia);

router.post("/webhook", recibirWebhook);

export default router;
