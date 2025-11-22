import mongoose from "mongoose";

// 🧩 Lista de palabras prohibidas
const palabrasProhibidas = [
  "idiota", "tonto", "gil", "mierda", "puta", "imbécil", "forro", "tarado",
];

const reservaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
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
