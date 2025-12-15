import Pedido from "../models/Pedido.js";
import AppError from "../utils/appError.js";

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
          email: pedido.cliente.email,
        }
      : { _id: null, nombre: "Usuario eliminado" },
    items: pedido.items.map((item) => ({
      cantidad: item.cantidad,
      producto: item.producto
        ? {
            _id: item.producto._id,
            nombre: item.producto.nombre,
            precio: item.producto.precio,
            imagen: item.producto.imagen,
          }
        : { _id: null, nombre: "Producto eliminado", precio: 0 },
    })),
  };
};

async function crearPedido(datosPedido) {
  const nuevoPedido = new Pedido(datosPedido);
  return await nuevoPedido.save();
}

async function obtenerPedidos(filtro = {}) {
  const pedidos = await Pedido.find(filtro)
    .populate("items.producto")
    .populate("cliente")
    .sort({ createdAt: -1 })
    .lean();
  return pedidos.map((pedido) => formatearPedido(pedido));
}

async function obtenerPedidoPorId(id) {
  const pedido = await Pedido.findById(id).populate("items.producto").populate("cliente").lean();

  if (!pedido) {
    return null;
  }

  return formatearPedido(pedido);
}

export const modificarPedidoUsuario = async (id, { items, direccion, telefono }) => {
  const pedido = await Pedido.findById(id);

  if (!pedido) {
    throw new AppError("El pedido no existe", 404);
  }

  if (pedido.estado !== "pendiente") {
    throw new AppError(`El pedido ya está ${pedido.estado}, no puedes modificarlo.`, 400);
  }

  if (items) {
    pedido.items = items;
  }
  if (direccion) {
    pedido.direccion = direccion;
  }
  if (telefono) {
    pedido.telefono = telefono;
  }

  const pedidoGuardado = await pedido.save();
  return pedidoGuardado;
};

/**
  @param {string} id 
  @param {string} nuevoEstado 
  @param {boolean} esWebhook 
 */
export const actualizarEstadoPedido = async (id, nuevoEstado, esWebhook = false) => {
  const transicionesManuales = {
    pendiente: ["cancelado"],
    confirmado: ["preparando", "cancelado"],
    preparando: ["listo", "cancelado"],
    listo: ["entregado", "cancelado"],
    entregado: [],
    cancelado: [],
  };

  const pedido = await Pedido.findById(id);
  if (!pedido) {
    throw new AppError("Pedido no encontrado", 404);
  }

  if (nuevoEstado === "confirmado") {
    if (!esWebhook) {
      throw new AppError("Acción denegada: Requiere pago.", 403);
    }
    if (pedido.estado !== "pendiente") {
      return pedido;
    }
  } else {
    const transicionesPosibles = transicionesManuales[pedido.estado] || [];
    if (pedido.estado === nuevoEstado) {
      return pedido;
    }
    if (!transicionesPosibles.includes(nuevoEstado)) {
      throw new AppError(`No puedes pasar de '${pedido.estado}' a '${nuevoEstado}'.`, 400);
    }
  }

  pedido.estado = nuevoEstado;
  if (nuevoEstado === "confirmado") {
    pedido.fecha_pago = new Date();
  }

  return await pedido.save();
};
async function eliminarPedido(id) {
  return Pedido.findByIdAndDelete(id).lean();
}

export default {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarEstadoPedido,
  eliminarPedido,
};
