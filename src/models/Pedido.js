import mongoose from "mongoose";

const ItemPedidoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: { type: Number, required: true, min: 1 },
});

const PedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    items: [ItemPedidoSchema],
    total: { type: Number, required: true },
    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "preparando", "listo", "entregado", "cancelado"],
      default: "pendiente",
    },
    direccion: String,
    telefono: String,
  },
  { timestamps: true }
);

export default mongoose.model("Pedido", PedidoSchema);
