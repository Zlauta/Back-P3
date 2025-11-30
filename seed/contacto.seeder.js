import mongoose from "mongoose";
// ⚠️ Nota las llaves { } porque en tu modelo usaste 'export const'
import  contactoModel  from "../src/models/Contacto.js"; 
import { connectDB } from "../src/config/config.db.js";

const seederContactos = async () => {
  try {
    // 1. Conectamos a la DB
    await connectDB();
    console.log("Conectado a MongoDB para seeder de contactos");

    // 2. Definimos los contactos respetando tu Schema (nombre, email, telefono, mensaje, estado)
    const contactos = [
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Juan Pérez",
        email: "juan.perez@email.com",
        telefono: "+5491122334455",
        mensaje: "Hola, quisiera saber si tienen opciones sin TACC certificadas para este fin de semana.",
        estado: "pendiente" // Coincide con tu enum
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Lucía Gómez",
        email: "lucia.gomez@email.com",
        telefono: "+5493411122233",
        mensaje: "Quería avisar que ya realicé el pago de la seña para la reserva del sábado.",
        estado: "resuelto" // Coincide con tu enum
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Martín Rodriguez",
        email: "martin.rod@email.com",
        telefono: "+5491155566677",
        mensaje: "Buenas noches, ¿hacen eventos privados para 30 personas en la terraza?",
        estado: "pendiente"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Sofía Martinez",
        email: "sofi.m@email.com",
        telefono: "+5493514445555",
        mensaje: "El pedido de anoche llegó un poco frío, quería dejar la sugerencia de mejorar el empaquetado.",
        estado: "resuelto"
      }
    ];

    // 3. Limpiamos la colección existente
    await contactoModel.deleteMany({});
    console.log("Mensajes de contacto anteriores eliminados");

    // 4. Insertamos los nuevos mensajes
    await contactoModel.insertMany(contactos);
    console.log("Mensajes de contacto insertados correctamente 📩");

    // 5. Desconexión
    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de contactos:", error);
    mongoose.disconnect();
  }
};

// Ejecutar el seeder
seederContactos();