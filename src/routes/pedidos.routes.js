const express = require("express");
const router = express.Router();
const pedidoCtrl = require("../controllers/pedido.controller");

// Endpoints CRUD para pedidos
router.post("/", pedidoCtrl.crear); // Crear un pedido
router.get("/", pedidoCtrl.listar); // Listar todos los pedidos
router.get("/:id", pedidoCtrl.obtenerPorId); // Obtener un pedido por ID
router.patch("/:id/estado", pedidoCtrl.actualizarEstado); // Actualizar estado del pedido
router.delete("/:id", pedidoCtrl.eliminar); // Eliminar un pedido

module.exports = router;
