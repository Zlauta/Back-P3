import pedidoService from "../services/pedido.service.js";

export const crear = async (req, res, next) => {
  try {
    const pedidoCreado = await pedidoService.crearPedido(req.body);
    res.status(201).json(pedidoCreado);
  } catch (error) {
    console.error("Error en crear:", error);
    next(error);
  }
};

export const listar = async (req, res, next) => {
  try {
    const pedidos = await pedidoService.obtenerPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error("Error en listar:", error);
    next(error);
  }
};

export const obtenerPorId = async (req, res, next) => {
  try {
    const pedido = await pedidoService.obtenerPedidoPorId(req.params.id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(pedido);
  } catch (error) {
    console.error("Error en obtenerPorId:", error);
    next(error);
  }
};

export const editarPedido = async (req, res, next) => {
  const { id } = req.params;
  // Extraemos todo el body para pasárselo al servicio
  const datosAEditar = req.body;

  try {
    const pedidoActualizado = await pedidoService.modificarPedidoUsuario(id, datosAEditar);

    res.status(200).json(pedidoActualizado);
  } catch (error) {
    // Manejo de errores simple basado en el mensaje que lanzamos en el servicio
    next(error);
  }
};

export const cambiarEstadoAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { estado } = req.body; // Ej: "preparando"

  try {
    // Llamamos a la máquina de estados con FALSE (es acción manual)
    // Esto permitirá "confirmado" -> "preparando"
    // Pero bloqueará "confirmado" -> "pendiente"
    const pedidoActualizado = await pedidoService.actualizarEstadoPedido(id, estado, false);

    res.json(pedidoActualizado);
  } catch (error) {
    next(error);
  }
};

export const eliminar = async (req, res, next) => {
  try {
    const pedidoEliminado = await pedidoService.eliminarPedido(req.params.id);

    if (!pedidoEliminado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error en eliminar:", error);
    next(error);
  }
};
