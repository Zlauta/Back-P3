import Order from "../models/Pedido.js";

async function crearPedido(datosPedido) {
  const order = new Order(datosPedido);
  return await order.save();
}

async function obtenerPedidos(filtro = {}) {
  return Order.find(filtro)
    .populate("items.producto") // corregido
    .populate("cliente")
    .sort({ createdAt: -1 })
    .lean();
}

async function obtenerPedidoPorId(id) {
  return Order.findById(id)
    .populate("items.producto") // corregido
    .populate("cliente")
    .lean();
}

async function actualizarEstadoPedido(id, estado) {
  const estadosValidos = [
    "pendiente",
    "confirmado",
    "preparando",
    "listo",
    "entregado",
    "cancelado",
  ];

  if (!estadosValidos.includes(estado)) {
    throw new Error("Estado inválido");
  }

  return Order.findByIdAndUpdate(id, { estado }, { new: true }).lean();
}

async function eliminarPedido(id) {
  return Order.findByIdAndDelete(id).lean();
}

export default {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarEstadoPedido,
  eliminarPedido,
};
