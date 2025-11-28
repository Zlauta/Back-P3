import UsuarioModel from "../models/Usuario.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (body) => {
  try {
    const nuevoUsuarioDB = new UsuarioModel(body);
    nuevoUsuarioDB.contrasenia = await argon.hash(nuevoUsuarioDB.contrasenia);
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
        msg: "Usuario o contraseña incorrecto",
      };

    const contraseniaOk = await argon.verify(
      usuarioExistente.contrasenia,
      body.contrasenia
    );

    if (!contraseniaOk)
      return {
        statusCode: 400,
        msg: "Usuario o contraseña incorrecto",
      };

    console.log(usuarioExistente);
    const payload = {
      nombre: usuarioExistente.nombre,
      email: usuarioExistente.email,
      rol: usuarioExistente.rol,
      estado: usuarioExistente.estado,
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

export const editarUsuarioService = async (id, body, usuarioAuth) => {
  try {
    const usuarioTarget = await UsuarioModel.findById(id);
    if (!usuarioTarget) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    // Validar que el usuario autenticado no modifique su propio rol/estado
    if (usuarioAuth.email === usuarioTarget.email) {
      if ("rol" in body || "estado" in body) {
        return {
          msg: "No puedes modificar tu propio rol ni estado",
          statusCode: 403,
        };
      }
    }

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
      msg: "Usuario actualizado con éxito",
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

export const eliminarUsuarioService = async (id, usuarioAuth) => {
  try {
    const usuarioTarget = await UsuarioModel.findById(id);
    if (!usuarioTarget) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
        data: null,
      };
    }

    // Evitar que un usuario se elimine a sí mismo
    if (usuarioAuth.email === usuarioTarget.email) {
      return {
        msg: "No puedes eliminar tu propio usuario",
        statusCode: 403,
        data: null,
      };
    }

    const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
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
