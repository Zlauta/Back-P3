import UsuarioModel from "../models/usuario.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (body) => {
  try {
    const nuevoUsuarioDB = new UsuarioModel(body);
    nuevoUsuarioDB.contrasenia = await argon.hash(nuevoUsuarioDB.contrasenia);
    /* const nuevoCarritoDB = new CarritoModel({
      idUsuario: nuevoUsuarioDB._id,
    });
    await nuevoCarritoDB.save();
    nuevoUsuarioDB.idCarrito = nuevoCarritoDB._id; */
    await nuevoUsuarioDB.save();
    return {
      statusCode: 201,
      msg: "Usuario registrado correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      msg: `Error al registrar usuario: ${
        error?.message || "Error desconocido"
      }`,
    };
  }
};

export const loginUsuarioService = async (body) => {
  try {
    const usuarioExistente = await UsuarioModel.findOne({
      $or: [{ nombre: body.nombre }, { email: body.email }],
    });
    if (!usuarioExistente)
      return {
        statusCode: 400,
        msg: "Usuario o contraseña incorrecto - USUARIO",
      };

    const contraseniaOk = await argon.verify(
      usuarioExistente.contrasenia,
      body.contrasenia
    );

    if (!contraseniaOk)
      return {
        statusCode: 400,
        msg: "Usuario o contraseña incorrecto - CONTRASEÑIA",
      };

    console.log(usuarioExistente);
    const payload = {
      nombre: usuarioExistente.nombre,
      email: usuarioExistente.email,
      rol: usuarioExistente.rol,
      //idCarrito: usuarioExistente.idCarrito,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    console.log(token);
    return {
      statusCode: 200,
      msg: "Usuario logueado correctamente",
      token,
      payload,
    };
  } catch (error) {
    console.error(error);
  }
};

export const obtenerUsuariosService = async () => {
  try {
    const usuarios = await UsuarioModel.find();
    return usuarios;
  } catch (error) {
    throw new Error("error al obtener usuarios");
  }
};

export const editarUsuarioService = async (id, body) => {
  try {
    const usuarioActualizadoBD = await UsuarioModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    return {
      usuarioActualizadoBD,
      msg: "Usuario actualizado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: `Error al actualizar usuario: ${
        error?.message || "Error desconocido"
      }`,
      statusCode: 400,
    };
  }
};

export const eliminarUsuarioService = async (id) => {
  try {
    const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Usuario eliminado exitosamente",
      statusCode: 200,
      data: usuarioEliminado,
    };
  } catch (error) {
    return {
      msg: "Error al eliminar usuario",
      statusCode: 500,
      data: null,
    };
  }
};
