import Order from "../models/Pedido.js";


const formatearPedido = (pedido) => {
  return {
    _id: pedido._id,
    total: pedido.total,
    estado: pedido.estado,
    direccion: pedido.direccion,
    telefono: pedido.telefono,
    createdAt: pedido.createdAt,
    updatedAt: pedido.updatedAt,
    cliente: pedido.cliente
      ? { 
          _id: pedido.cliente._id, 
          nombre: pedido.cliente.nombre, 
          email: pedido.cliente.email 
        }
      : { _id: null, nombre: "Usuario eliminado" },
    items: pedido.items.map((item) => ({
      cantidad: item.cantidad,
      producto: item.producto
        ? { 
            _id: item.producto._id, 
            nombre: item.producto.nombre, 
            precio: item.producto.precio,
            imagen: item.producto.imagen
          }
        : { _id: null, nombre: "Producto eliminado", precio: 0 },
    })),
  };
};

async function crearPedido(datosPedido) {
  const nuevoPedido = new Order(datosPedido);
  return await nuevoPedido.save();
}

async function obtenerPedidos(filtro = {}) {
  const pedidos = await Order.find(filtro)
    .populate("items.producto") 
    .populate("cliente")
    .sort({ createdAt: -1 })
    .lean();
  return pedidos.map(pedido => formatearPedido(pedido));
}

async function obtenerPedidoPorId(id) {
  const pedido = await Order.findById(id)
    .populate("items.producto")
    .populate("cliente")
    .lean();

  if (!pedido) return null;

  return formatearPedido(pedido);
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
    throw new Error(`Estado inválido. Permitidos: ${estadosValidos.join(", ")}`);
  }

  const pedidoActualizado = await Order.findByIdAndUpdate(id, { estado }, { new: true })
    .populate("items.producto")
    .populate("cliente")
    .lean();

  if (!pedidoActualizado) return null;

  return formatearPedido(pedidoActualizado);
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