import UsuarioModel from "../models/Usuario.js";
import argon from "argon2";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const registrarUsuarioService = async (body) => {
  const { email, nombre, contrasenia, telefono } = body;
  const nuevoUsuarioDB = new UsuarioModel({ email, nombre, contrasenia, telefono });
  nuevoUsuarioDB.contrasenia = await argon.hash(nuevoUsuarioDB.contrasenia);
  await nuevoUsuarioDB.save();
  return {
    statusCode: 201,
    msg: "Usuario registrado correctamente",
  };
};

export const loginUsuarioService = async (body) => {
  const usuarioExistente = await UsuarioModel.findOne({ email: body.email });
  if (!usuarioExistente) {
    throw new AppError("Usuario o contraseña incorrecto", 400);
  }

  const contraseniaOk = await argon.verify(usuarioExistente.contrasenia, body.contrasenia);

  if (!contraseniaOk) {
    throw new AppError("Usuario o contraseña incorrecto", 400);
  }
  const payload = {
    _id: usuarioExistente._id,
    nombre: usuarioExistente.nombre,
    email: usuarioExistente.email,
    rol: usuarioExistente.rol,
    estado: usuarioExistente.estado,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  return {
    statusCode: 200,
    msg: "Usuario logueado correctamente",
    token,
    payload,
  };
};

export const obtenerUsuariosService = async () => {
  const usuarios = await UsuarioModel.find().select('-contrasenia');
  return usuarios;
};

export const editarUsuarioService = async (id, body, usuarioAuth) => {
  const usuarioTarget = await UsuarioModel.findById(id);
  if (!usuarioTarget) {
    throw new AppError("Usuario no encontrado", 404);
  }

  if (usuarioAuth.email === usuarioTarget.email) {
    if ("rol" in body || "estado" in body) {
      throw new AppError("No puedes modificar tu propio rol ni estado", 403);
    }
  }
  
  const { nombre, telefono, rol, estado } = body;
  

  const datosAActualizar = {};
  if (nombre) datosAActualizar.nombre = nombre;
  if (telefono) datosAActualizar.telefono = telefono;
  if (rol) datosAActualizar.rol = rol;
  if (estado) datosAActualizar.estado = estado;

  const usuarioActualizadoBD = await UsuarioModel.findByIdAndUpdate(id, datosAActualizar, {
    new: true,
    runValidators: true,
  });

  return {
    usuarioActualizadoBD,
    msg: "Usuario actualizado con éxito",
    statusCode: 200,
  };
};

export const eliminarUsuarioService = async (id, usuarioAuth) => {
  const usuarioTarget = await UsuarioModel.findById(id);
  if (!usuarioTarget) {
    throw new AppError("Usuario no encontrado", 404);
  }

  if (usuarioAuth.email === usuarioTarget.email) {
    throw new AppError("No puedes eliminar tu propio usuario", 403);
  }

  const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
  return {
    msg: "Usuario eliminado exitosamente",
    statusCode: 200,
    data: usuarioEliminado,
  };
};
