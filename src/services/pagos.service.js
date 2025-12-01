import { Preference } from "mercadopago";
import { client } from "../config/config.mercadoPago.js";
import Pedido from "../models/Pedido.js";
import Usuario from "../models/Usuario.js"; // 

export const crearPedidoYPreferencia = async ({
  items,
  total,
  direccion,
  telefono,
  emailUsuario,
}) => {

  if (!items || items.length === 0) {
    throw new Error("El carrito está vacío");
  }

  const usuarioEncontrado = await Usuario.findOne({ email: emailUsuario });

  if (!usuarioEncontrado) {
    throw new Error("El usuario del token no existe en la base de datos");
  }

  const idCliente = usuarioEncontrado._id; 

  try {
    const itemsParaDB = items.map((item) => ({
      producto: item._id,
      cantidad: item.quantity,
    }));

    const nuevoPedido = new Pedido({
      cliente: idCliente, 
      items: itemsParaDB,
      total: total,
      estado: "pendiente",
      direccion: direccion || "Retiro en Local",
      telefono: telefono || "Sin teléfono",
    });

    const pedidoGuardado = await nuevoPedido.save();

    const preference = new Preference(client);

    const body = {
      items: items.map((item) => ({
        title: item.nombre,
        quantity: Number(item.quantity),
        unit_price: Number(item.precio),
        currency_id: "ARS",
      })),
      external_reference: pedidoGuardado._id.toString(),
      back_urls: {
        success: "http://localhost:5173",
        failure: "http://localhost:5173",
        pending: "http://localhost:5173",
      },
      // auto_return: "approved",
    };

    const resultadoMP = await preference.create({ body });

    return {
      id: resultadoMP.id,
      idPedido: pedidoGuardado._id,
    };
  } catch (error) {
    console.error("Error en servicio de pagos:", error);
    throw error;
  }
};
