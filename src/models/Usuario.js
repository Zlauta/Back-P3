import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
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
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    },

    rol: {
      type: String,
      required: true,
      enum: ["admin", "cliente"],
      default: "cliente",
    },
    estado: {
      type: String,
      required: true,
      enum: ["activo", "inactivo"],
      default: "activo",
    },
    telefono: {
      type: String,
      required: true,
      match: /^\+?[1-9]\d{7,14}$/,
    },
  },
  {
    timestamps: true,
  }
);

const UsuarioModel = model("Usuario", usuarioSchema);

export default UsuarioModel;
