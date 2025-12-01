import pedidoService from "../services/pedido.service.js"; 

export const crear = async (req, res) => {
  try {
    const pedidoCreado = await pedidoService.crearPedido(req.body);
    res.status(201).json(pedidoCreado);
  } catch (error) {
    console.error("Error en crear:", error);
    res.status(500).json({ message: "Error al crear el pedido", error: error.message });
  }
};


export const listar = async (req, res) => {
  try {
    const pedidos = await pedidoService.obtenerPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error("Error en listar:", error);
    res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
  }
};

export const obtenerPorId = async (req, res) => {
  try {
    const pedido = await pedidoService.obtenerPedidoPorId(req.params.id);
    
    if (!pedido) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(pedido);
  } catch (error) {
    console.error("Error en obtenerPorId:", error);
    res.status(500).json({ message: "Error al obtener el pedido", error: error.message });
  }
};

export const actualizarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const pedidoActualizado = await pedidoService.actualizarEstadoPedido(req.params.id, estado);
    
    if (!pedidoActualizado) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(pedidoActualizado);
  } catch (error) {
    console.error("Error en actualizarEstado:", error);
    if (error.message.includes("Estado inválido")) {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al actualizar estado", error: error.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const pedidoEliminado = await pedidoService.eliminarPedido(req.params.id);
    
    if (!pedidoEliminado) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error en eliminar:", error);
    res.status(500).json({ message: "Error al eliminar pedido", error: error.message });
  }
};