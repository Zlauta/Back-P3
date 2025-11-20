import { Schema, model } from "mongoose";

const contactoSchema = new Schema(
  {
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,}
    ,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    mensaje: {
        type: String,
        required: true,
        trim: true,
    },
  },
  {
    timestamps: true,

  }
);

export const contactoModel = model("contacto", contactoSchema);