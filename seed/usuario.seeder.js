import mongoose from "mongoose";
import UsuarioModel from "../src/models/usuario.js"; // Ajusta la ruta según tu proyecto
import { connectDB } from "../src/config/config.db.js"; 

const seederUsuarios = async () => {
  try {
    await connectDB();
    console.log("Conectado a MongoDB para seeder de usuarios");

    const usuarios = [
      {
        _id: new mongoose.Types.ObjectId("691bdccf027cdfde2dc4a559"),
        nombre: "Gloria",
        email: "gloria@gmail.com",
        contrasenia:
          "$argon2id$v=19$m=65536,t=3,p=4$UaJ+9T+T8SqU5N1onExyGA$q51eFyhcKzE2jayf…",
        rol: "admin",
        estado: "activo",
        telefono: "+54375786780",
      },
      {
        _id: new mongoose.Types.ObjectId("691cb1398eb1ed4921b5f0e8"),
        nombre: "Daniel",
        email: "daniel@gmail.com",
        contrasenia:
          "$argon2id$v=19$m=65536,t=3,p=4$XHzF5OxbNuKVur+tUixb6g$G3BxA6fAEcrs5czU…",
        rol: "admin",
        estado: "inactivo",
        telefono: "+5423546478",
      },
      {
        _id: new mongoose.Types.ObjectId("6922090042aa75b263448d7f"),
        nombre: "Sol",
        email: "sol@gmail.com",
        contrasenia:
          "$argon2id$v=19$m=65536,t=3,p=4$6u5JXHsnUEH49igVvVlaQw$J9j5KTUsG4HO/JUz…",
        rol: "cliente",
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
