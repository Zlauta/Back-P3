import mongoose from "mongoose";
import PedidoModel from "../src/models/Pedido.js";
import { connectDB } from "../src/config/config.db.js";

const seederPedidos = async () => {
  try {
    await connectDB();

    console.log("Conectado a MongoDB para seeder de pedidos");


    const usuarioId = "69153048d8b189c23f181099";
    const productosIds = [
      "69151787d5ddc699d20aa9d8",
      "6915ee27bc6a2b6c8320f643",
    ];


    const pedidos = [
      {
        cliente: usuarioId,
        items: [
          { producto: productosIds[0], cantidad: 2 },
          { producto: productosIds[1], cantidad: 1 },
        ],
        total: 4500,
        estado: "pendiente",
        direccion: "Calle Falsa 123",
        telefono: "+34123456789",
      },
      {
        cliente: usuarioId,
        items: [
          { producto: productosIds[1], cantidad: 3 },
        ],
        total: 3000,
        estado: "confirmado",
        direccion: "Avenida Siempre Viva 742",
        telefono: "+34111222333",
      },
    ];


    await PedidoModel.deleteMany({});
    console.log("Pedidos anteriores eliminados");


    await PedidoModel.insertMany(pedidos);
    console.log("Pedidos seeders insertados correctamente");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error en el seeder de pedidos:", error);
    mongoose.disconnect();
  }
};


seederPedidos();
