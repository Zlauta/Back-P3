import {
  crearUsuarioService,
  editarUsuarioService,
  eliminarUsuarioService,
  loginUsuarioService,
  obtenerUsuarioPorIdService,
  obtenerUsuariosService,
  registrarUsuarioService,
} from "../services/usuarios.service.js";


export const registrarUsuarioController = async (req, res) => {
  const { msg, statusCode } = await registrarUsuarioService(req.body);
  res.status(statusCode).json({ msg });
};

// login usuario
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

export const obtenerUsuarioPorIdController = async (req, res) => {
  const id = req.params.id;
  const usuario = await obtenerUsuarioPorIdService(id);
  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrada" });
  res.status(200).json({ usuario });
};


export const crearUsuarioController = async (req, res) => {
  const { msg, statusCode } = await crearUsuarioService(req.body);
  const nuevoUsuario = req.body;

  if (statusCode === 201) {
    res.status(statusCode).json({ nuevoUsuario, msg });
  } else {
    res.status(statusCode).json({ msg });
  }
};


export const editarUsuarioController = async (req, res) => {
  const id = req.params.id;

  const usuarioActualizado = await editarUsuarioService(id, req.body);
  const { msg, statusCode } = usuarioActualizado;
  if (statusCode === 200) {
    res.status(statusCode).json({ usuarioActualizado, msg });
  } else {
    res.status(statusCode).json({ msg });
  }
};

export const eliminarUsuarioController = async (req, res) => {
  const id = req.params.id;
  const usuarioEliminado = await eliminarUsuarioService(id);
  if (!usuarioEliminado)
    return res.status(404).json({ msg: "Usuario no encontrado" });
  return res.status(200).json({ usuarioEliminado, msg: "Eliminacion exitosa" });
};
