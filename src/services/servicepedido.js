const Order = require("../models/orderpedido");

async function createOrder(orderData) {
  // orderData: { customer, items, total, address, phone }
  const order = new Order(orderData);
  return await order.save();
}

async function getOrders(filter = {}) {
  return Order.find(filter)
    .populate("items.product")
    .populate("customer")
    .sort({ createdAt: -1 });
}

async function getOrderById(id) {
  return Order.findById(id).populate("items.product").populate("customer");
}

async function updateOrderStatus(id, status) {
  const validStatus = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "delivered",
    "cancelled",
  ];
  if (!validStatus.includes(status)) {
    throw new Error("Estado inválido");
  }

  return Order.findByIdAndUpdate(id, { status }, { new: true });
}

async function deleteOrder(id) {
  return Order.findByIdAndDelete(id);
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
