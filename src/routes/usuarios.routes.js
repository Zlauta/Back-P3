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

const router = Router();

router.post("/registro", crearUsuarioValidator, registrarUsuarioController);
router.post("/login", loginUsuarioController);
router.get("/", obtenerUsuariosController);
router.put("/:id", editarUsuarioValidator, editarUsuarioController);
router.delete("/:id", eliminarUsuarioController);

export default router;
