import { Router } from "express";
import {
  crearUsuarioController,
  editarUsuarioController,
  eliminarUsuarioController,
  loginUsuarioController,
  obtenerUsuarioPorIdController,
  obtenerUsuariosController,
  registrarUsuarioController,
} from "../controllers/usuarios.controller.js";


const router = Router();

router.post("/registro", registrarUsuarioController);
router.post("/login", loginUsuarioController);

router.get("/", obtenerUsuariosController);
router.get("/:id", obtenerUsuarioPorIdController);
router.post("/", crearUsuarioController);
router.put("/:id", editarUsuarioController);
router.delete("/:id", eliminarUsuarioController);

export default router;
