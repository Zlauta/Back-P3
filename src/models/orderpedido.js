const mongoose = require("mongoose");

// Esquema para los ítems del pedido
const ItemPedidoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto", // referencia al modelo Producto
    required: true,
  },
  cantidad: { type: Number, required: true, min: 1 },
});

// Esquema principal para los pedidos
const PedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // referencia al modelo Usuario
    },
    items: [ItemPedidoSchema],
    total: { type: Number, required: true },
    estado: {
      type: String,
      enum: [
        "pendiente",
        "confirmado",
        "preparando",
        "listo",
        "entregado",
        "cancelado",
      ],
      default: "pendiente",
    },
    direccion: String,
    telefono: String,
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
);

// Exportamos el modelo Pedido
module.exports = mongoose.model("Pedido", PedidoSchema);
