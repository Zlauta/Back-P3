import mongoose from "mongoose";
import ReseniaModel from "../src/models/Resenias.js";
import { connectDB } from "../src/config/config.db.js";
import argon from "argon2";

const seederResenias = async () => {
  try {
    await connectDB();
    console.log("Conectado a MongoDB para seeder de resenias");

    const resenias = [
      {
        _id: new mongoose.Types.ObjectId("692b3672f28dc1006496b507"),
        nombre: "Amelia",
        comentario: "Nos trajeron la comida fria. Muy mala experiencia.",
        calificacion: 2,
        activo: true,
      },
      {
        _id: new mongoose.Types.ObjectId("692b3693f28dc1006496b50a"),
        nombre: "Carolina",
        comentario:
          "Excelente atencion y un manjar los platos que pedimos. Volveremos pronto!",
        calificacion: 5,
        activo: true,
      },
    ];

    // Limpiamos las resenias existentes
    await ReseniaModel.deleteMany({});
    console.log("Resenias anteriores eliminadas");

    // Insertamos las nuevas resenias
    await ReseniaModel.insertMany(resenias);
    console.log("Resenias seeders insertados correctamente");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de usuarios:", error);
    mongoose.disconnect();
  }
};

seederResenias();
