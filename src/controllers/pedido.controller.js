import pedidoService from "../services/pedido.service.js";

// Crear un pedido
export const crear = async (req, res) => {
  try {
    const pedidoCreado = await pedidoService.crearPedido(req.body);
    res.status(201).json(pedidoCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el pedido", error: error.message });
  }
};

// Listar todos los pedidos
export const listar = async (req, res) => {
  try {
    const pedidos = await pedidoService.obtenerPedidos();

    // Transformamos para evitar errores si alguna referencia es null
    const pedidosSafe = pedidos.map(p => ({
      _id: p._id,
      cliente: p.cliente
        ? { _id: p.cliente._id, nombre: p.cliente.nombre, email: p.cliente.email }
        : { _id: null, nombre: "Usuario eliminado" },
      items: p.items.map(i => ({
        producto: i.product
          ? { _id: i.product._id, nombre: i.product.nombre, precio: i.product.precio }
          : { _id: null, nombre: "Producto eliminado" },
        cantidad: i.cantidad
      })),
      total: p.total,
      estado: p.estado,
      direccion: p.direccion,
      telefono: p.telefono,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.json(pedidosSafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
  }
};

// Obtener un pedido por ID
export const obtenerPorId = async (req, res) => {
  try {
    const pedido = await pedidoService.obtenerPedidoPorId(req.params.id);
    if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });

    const pedidoSafe = {
      _id: pedido._id,
      cliente: pedido.cliente
        ? { _id: pedido.cliente._id, nombre: pedido.cliente.nombre, email: pedido.cliente.email }
        : { _id: null, nombre: "Usuario eliminado" },
      items: pedido.items.map(i => ({
        producto: i.product
          ? { _id: i.product._id, nombre: i.product.nombre, precio: i.product.precio }
          : { _id: null, nombre: "Producto eliminado" },
        cantidad: i.cantidad
      })),
      total: pedido.total,
      estado: pedido.estado,
      direccion: pedido.direccion,
      telefono: pedido.telefono,
      createdAt: pedido.createdAt,
      updatedAt: pedido.updatedAt,
    };

    res.json(pedidoSafe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el pedido", error: error.message });
  }
};

// Actualizar estado de un pedido
export const actualizarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const pedidoActualizado = await pedidoService.actualizarEstadoPedido(req.params.id, estado);
    if (!pedidoActualizado) return res.status(404).json({ message: "Pedido no encontrado" });

    res.json(pedidoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar estado", error: error.message });
  }
};

// Eliminar un pedido
export const eliminar = async (req, res) => {
  try {
    const pedidoEliminado = await pedidoService.eliminarPedido(req.params.id);
    if (!pedidoEliminado) return res.status(404).json({ message: "Pedido no encontrado" });

    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar pedido", error: error.message });
  }
};
