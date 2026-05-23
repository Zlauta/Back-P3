import { Preference, Payment } from "mercadopago";
import { client } from "../config/config.mercadoPago.js";
import Pedido from "../models/Pedido.js";
import Usuario from "../models/Usuario.js";
import AppError from "../utils/appError.js";
import pedidoService from "./pedido.service.js";

export const crearPedidoYPreferencia = async ({
  items,
  total,
  direccion,
  telefono,
  emailUsuario,
}) => {
  if (!items || items.length === 0) {
    throw new AppError("El carrito está vacío", 400);
  }

  const usuarioEncontrado = await Usuario.findOne({ email: emailUsuario });
  if (!usuarioEncontrado) {
    throw new AppError("El usuario del token no existe en la base de datos", 404);
  }

  const idCliente = usuarioEncontrado._id;

  const nuevoPedido = new Pedido({
    cliente: idCliente,
    items: items.map((item) => ({
      producto: item._id,
      cantidad: item.cantidad || item.quantity,
    })),
    total: total,
    estado: "pendiente",
    direccion: direccion || "Retiro en Local",
    telefono: telefono || "Sin teléfono",
  });

  const pedidoGuardado = await nuevoPedido.save();

  const preference = new Preference(client);

  const body = {
    items: items.map((item) => ({
      title: item.nombre || item.name,
      quantity: Number(item.cantidad || item.quantity),
      unit_price: Number(item.precio || item.price),
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
};

export const procesarWebhook = async (query, body) => {
  try {
    const topic = query.topic || query.type;
    const type = body?.type;

    if (topic === "payment" || type === "payment") {
      const paymentId = query.id || body?.data?.id;

      if (!paymentId) {
        console.error("ID de pago no encontrado en webhook");
        return;
      }

      const payment = new Payment(client);
      const pagoData = await payment.get({ id: paymentId });

      if (pagoData.status === "approved") {
        const idPedido = pagoData.external_reference;
        await pedidoService.actualizarEstadoPedido(idPedido, "confirmado", true);
      } else {
        console.error(`Pago ${paymentId} rechazado o en estado inesperado: ${pagoData.status}`);
      }
    }
  } catch (error) {
    console.error("Error procesando webhook:", error.message);
  }
};
