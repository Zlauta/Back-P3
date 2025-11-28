import mongoose from "mongoose"

const reservaSchema = new mongoose.Schema(
  {
    // ✔ Ahora es un string, no ObjectId
    usuario: {
      type: String,
      required: true,
      trim: true,
    },

    // ✔ Email único para identificar al usuario
    usuarioEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    mesa: {
      type: Number,
      required: true,
      min: 1,
    },

    cantidadPersonas: {
      type: Number,
      required: true,
      min: 1,
    },

    fecha: {
      type: Date,
      required: true,
    },

    hora: {
      type: String,
      required: true,
    },

    notas: {
      type: String,
      trim: true,
      maxlength: [200, "Las notas no pueden superar los 200 caracteres"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Índice compuesto único
reservaSchema.index({ mesa: 1, fecha: 1, hora: 1 }, { unique: true });

const Reserva = mongoose.model("Reserva", reservaSchema);
export default Reserva;
