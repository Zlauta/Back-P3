import mongoose from "mongoose";
import UsuarioModel from "../src/models/Usuario.js";
import { connectDB } from "../src/config/config.db.js";
import argon from "argon2";

const seederUsuarios = async () => {
  try {
    await connectDB();
    console.log("Conectado a MongoDB para seeder de usuarios");

    const usuarios = [
      {
        _id: new mongoose.Types.ObjectId("691bdccf027cdfde2dc4a559"),
        nombre: "Lautaro",
        email: "lautaro@gmail.com",
        contrasenia: await argon.hash("@Hola123"),
        rol: "admin",
        estado: "activo",
        telefono: "+54375786780",
      },
      {
        _id: new mongoose.Types.ObjectId("691cb1398eb1ed4921b5f0e8"),
        nombre: "Matias",
        email: "matias@gmail.com",
        contrasenia: await argon.hash("@Hola123"),
        rol: "admin",
        estado: "inactivo",
        telefono: "+5423546478",
      },
      {
        _id: new mongoose.Types.ObjectId("6922090042aa75b263448d7f"),
        nombre: "Nadia",
        email: "nadia@gmail.com",
        contrasenia: await argon.hash("@Hola123"),
        rol: "cliente",
        estado: "activo",
        telefono: "+54329812",
      },

      {
        _id: new mongoose.Types.ObjectId("692b45e055e2ba956224cfbf"),
        nombre: "Felipe",
        email: "felipe@gmail.com",
        contrasenia: await argon.hash("@Hola123"),
        rol: "cliente",
        estado: "inactivo",
        telefono: "+54329812",
      },
      {
        _id: new mongoose.Types.ObjectId("692b45e055e2ba956224cfef"),
        nombre: "Amelia",
        email: "amelia@gmail.com",
        contrasenia: await argon.hash("@Hola123"),
        rol: "admin",
        estado: "activo",
        telefono: "+54329812",
      },
    ];

    // Limpiamos los usuarios existentes (opcional)
    await UsuarioModel.deleteMany({});
    console.log("Usuarios anteriores eliminados");

    // Insertamos los nuevos usuarios
    await UsuarioModel.insertMany(usuarios);
    console.log("Usuarios seeders insertados correctamente");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de usuarios:", error);
    mongoose.disconnect();
  }
};

seederUsuarios();
