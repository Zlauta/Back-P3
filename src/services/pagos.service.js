import { Preference, Payment } from "mercadopago";
import { client } from "../config/config.mercadoPago.js";
import Pedido from "../models/Pedido.js";
import Usuario from "../models/Usuario.js"; // 
import pedidoService from "./pedido.service.js";

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
        success: `${process.env.BASE_URL_FRONT}`,
        failure: `${process.env.BASE_URL_FRONT}`,
        pending: `${process.env.BASE_URL_FRONT}`,
      },
      auto_return: "approved",
      notification_url: `${process.env.BASE_URL_BACK}/api/pagos/webhook`,
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


export const procesarWebhook = async (query, body) => {
  try {
    const topic = query.topic || query.type;
    const type = body?.type;

    if (topic === "payment" || type === "payment") {
      const paymentId = query.id || body?.data?.id;

      if (!paymentId) throw new Error("ID de pago no encontrado");

      const payment = new Payment(client);
      const pagoData = await payment.get({ id: paymentId });
      
      if (pagoData.status === 'approved') {
        const idPedido = pagoData.external_reference;
        
        console.log(`Pago recibido. Solicitando actualización de pedido ${idPedido}...`);
        
        await pedidoService.actualizarEstadoPedido(idPedido, "confirmado", true);
      }
    }
  } catch (error) {
    console.error("Error webhook:", error.message);
  }
};