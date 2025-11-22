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

export const contactoModel = model("contacto", contactoSchema);
