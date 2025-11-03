import mongoose from "mongoose";

// 🧩 Lista de palabras prohibidas
const palabrasProhibidas = [
  "idiota", "tonto", "gil", "mierda", "puta", "imbécil", "forro", "tarado",
];

const reservaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    mesa: {
      type: Number,
      required: true,
      min:1,
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
    notas: {
      type: String,
      trim: true,
      maxlength: [200, "Las notas no pueden superar los 200 caracteres"],
      default: "",
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticos
  }
);

//  Índice compuesto único: una mesa no puede tener dos reservas el mismo día a la misma hora
reservaSchema.index({ mesa: 1, fecha: 1, hora: 1 }, { unique: true });

//  Middleware opcional para normalizar nombre
reservaSchema.pre("save", function (next) {
  if (this.nombre) {
    // Capitaliza la primera letra del nombre
    this.nombre =
      this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLowerCase();
  }
  next();
});

export const Reserva = mongoose.model("Reserva", reservaSchema);
