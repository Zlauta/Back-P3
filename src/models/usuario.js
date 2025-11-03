import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/,
    },
    rol: {
        type: String,
        required: true,
        enum: ["admin", "cliente"],
        default: "cliente",
    },
  },
  {
    timestamps: true,
  }
);

const UsuarioModel = model("Usuario", usuarioSchema);

export default UsuarioModel;