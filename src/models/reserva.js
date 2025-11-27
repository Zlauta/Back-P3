import mongoose from "mongoose";

// 🧩 Lista de palabras prohibidas
const palabrasProhibidas = [
  "idiota",
  "tonto",
  "gil",
  "mierda",
  "puta",
  "imbécil",
  "forro",
  "tarado",
];

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

    // ✔ Nombre visible en la reserva
    nombreReserva: {
      type: String,
      trim: true,
      default: "",
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
      validate: {
        validator: function (v) {
          return !palabrasProhibidas.some((palabra) =>
            v?.toLowerCase().includes(palabra)
          );
        },
        message: "Las notas contienen palabras inapropiadas.",
      },
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
