import { Router } from "express";
import { crearPreferencia } from "../controllers/pagos.controller.js";
import { validarTokenCliente } from "../middlewares/authClient.middleware.js";

const router = Router();

router.post("/crear-preferencia",validarTokenCliente, crearPreferencia);

export default router;