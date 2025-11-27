import { Router } from "express";
import {
  editarUsuarioController,
  eliminarUsuarioController,
  loginUsuarioController,
  obtenerUsuariosController,
  registrarUsuarioController,
} from "../controllers/usuarios.controller.js";
import {
  crearUsuarioValidator,
  editarUsuarioValidator,
} from "../middlewares/validacionUsuarios.middleware.js";
import { validarAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/registro", crearUsuarioValidator, registrarUsuarioController);
router.post("/login", loginUsuarioController);
router.get("/", validarAdmin, obtenerUsuariosController);
router.put("/:id", validarAdmin, editarUsuarioValidator, editarUsuarioController);
router.delete("/:id", validarAdmin, eliminarUsuarioController);

export default router;
