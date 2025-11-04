import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    emailUsuario: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Ingrese un email valido: no debe tener espacios, debe tener una arroba, el punto es obligatorio en el dominio, no debe haber espacios ni arrobas en la extension",
      ],
      lowercase: true,
      trim: true,
    },
    contrasenia: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      match: /^\+?[1-9]\d{1,14}$/,
    },
    rolUsuario: {
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
