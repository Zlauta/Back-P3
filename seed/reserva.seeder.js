import mongoose from "mongoose";
import Reserva from "../src/models/reserva.js";
import { connectDB } from "../src/config/config.db.js";
import argon from "argon2";

const seederReservas = async () => {
  try {
    await connectDB();
    console.log("Conectado a MongoDB para seeder de reservas");

    const reservas = [
      {
        _id: new mongoose.Types.ObjectId("692b1446f28dc1006496b4d4"),
        usuario: new mongoose.Types.ObjectId("691bdccf027cdfde2dc4a559"),
        mesa: 4,
        cantidadPersonas: 2,
        fecha: new Date("2025-11-12T00:00:00.000Z"),
        hora: "10:41",
        notas: "si fuera posible preferimos mesa rectangualar, no redonda",
      },
      {
        _id: new mongoose.Types.ObjectId("692b1486f28dc1006496b4da"),
        usuario: new mongoose.Types.ObjectId("691bdccf027cdfde2dc4a559"),
        mesa: 30,
        cantidadPersonas: 9,
        fecha: new Date("2025-12-07T15:00:00.000Z"),
        hora: "12:42",
        notas: "querriamos estar al aire libre.",
      },
    ];

    // Limpiamos los reservas existentes
    await Reserva.deleteMany({});
    console.log("Usuarios anteriores eliminados");

    // Insertamos las nuevas reservas
    await Reserva.insertMany(reservas);
    console.log("Reservas seeders insertados correctamente");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de reservas:", error);
    mongoose.disconnect();
  }
};

seederReservas();
