import { Schema, model } from "mongoose";

const contactoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      match: /^\+?[1-9]\d{7,14}$/,
    },
    mensaje: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ["pendiente", "resuelto"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

const contactoModel = model("contacto", contactoSchema);

export default contactoModel;
