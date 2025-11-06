const pedidoService = require("../services/pedido.service");

// Crear un nuevo pedido
async function crear(req, res) {
  try {
    const datos = req.body;
    const nuevoPedido = await pedidoService.crearPedido(datos);
    res.status(201).json(nuevoPedido);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
}

// Listar todos los pedidos
async function listar(req, res) {
  try {
    const pedidos = await pedidoService.obtenerPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
}

// Obtener un pedido por su ID
async function obtenerPorId(req, res) {
  try {
    const pedido = await pedidoService.obtenerPedidoPorId(req.params.id);
    if (!pedido)
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
}

// Actualizar el estado de un pedido
async function actualizarEstado(req, res) {
  try {
    const actualizado = await pedidoService.actualizarEstadoPedido(
      req.params.id,
      req.body.estado
    );
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
}

// Eliminar un pedido
async function eliminar(req, res) {
  try {
    await pedidoService.eliminarPedido(req.params.id);
    res.json({ mensaje: "Pedido eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
}

module.exports = {
  crear,
  listar,
  obtenerPorId,
  actualizarEstado,
  eliminar,
};