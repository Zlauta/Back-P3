import {
  editarUsuarioService,
  eliminarUsuarioService,
  loginUsuarioService,
  obtenerUsuariosService,
  registrarUsuarioService,
} from "../services/usuarios.service.js";

export const registrarUsuarioController = async (req, res) => {
  const { msg, statusCode } = await registrarUsuarioService(req.body);
  res.status(statusCode).json({ msg });
};

export const loginUsuarioController = async (req, res) => {
  const { msg, statusCode, token, payload } = await loginUsuarioService(
    req.body
  );
  res.status(statusCode).json({ msg, token, payload });
};

export const obtenerUsuariosController = async (req, res) => {
  const usuarios = await obtenerUsuariosService();
  res.status(200).json({ usuarios });
};

export const editarUsuarioController = async (req, res) => {
  const id = req.params.id;

  const usuarioActualizado = await editarUsuarioService(
    id,
    req.body,
    req.usuario
  );
  const { msg, statusCode } = usuarioActualizado;
  if (statusCode === 200) {
    res.status(statusCode).json({ usuarioActualizado, msg });
  } else {
    res.status(statusCode).json({ msg });
  }
};

export const eliminarUsuarioController = async (req, res) => {
  try {
    const id = req.params.id;
    const { msg, statusCode, data } = await eliminarUsuarioService(
      id,
      req.usuario
    );
    res.status(statusCode).json({ msg, data });
  } catch (error) {
    res.status(404).json({ msg: "Error al eliminar usuario" });
  }
};
