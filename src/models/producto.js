import { Schema, model } from "mongoose";

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 500,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      required: true,
      enum: ["comida", "bebida", "postre"],
    },
    imagen: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductoModel = model("Producto", productoSchema);

export default ProductoModel;
