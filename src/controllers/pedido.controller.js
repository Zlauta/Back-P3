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

export const editarPedido = async (req, res) => {
  const { id } = req.params;
  // Extraemos todo el body para pasárselo al servicio
  const datosAEditar = req.body; 

  try {
    const pedidoActualizado = await pedidoService.modificarPedidoUsuario(id, datosAEditar);
    
    res.status(200).json(pedidoActualizado);

  } catch (error) {
    // Manejo de errores simple basado en el mensaje que lanzamos en el servicio
    if (error.message.includes("no existe") || error.message.includes("⛔")) {
      return res.status(400).json({ mensaje: error.message });
    }
    
    res.status(500).json({ mensaje: "Error interno al editar el pedido" });
  }
};

export const cambiarEstadoAdmin = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; // Ej: "preparando"

  try {
    // Llamamos a la máquina de estados con FALSE (es acción manual)
    // Esto permitirá "confirmado" -> "preparando"
    // Pero bloqueará "confirmado" -> "pendiente"
    const pedidoActualizado = await pedidoService.actualizarEstadoPedido(id, estado, false);
    
    res.json(pedidoActualizado);

  } catch (error) {
    res.status(400).json({ mensaje: error.message });
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