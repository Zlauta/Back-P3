import mongoose from "mongoose";

// 🧩 Lista de palabras prohibidas
const palabrasProhibidas = [
  "idiota", "tonto", "gil", "mierda", "puta", "imbécil", "forro", "tarado",
];

const reservaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del reservante es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      validate: {
        validator: function (v) {
          // Rechaza palabras ofensivas
          return !palabrasProhibidas.some((p) =>
            new RegExp(`\\b${p}\\b`, "i").test(v)
          );
        },
        message: "El nombre contiene palabras inapropiadas",
      },
    },
    mesa: {
      type: Number,
      required: [true, "El número de mesa es obligatorio"],
      min: [1, "La mesa debe ser un número entero positivo"],
    },
    cantidadPersonas: {
      type: Number,
      required: [true, "Debe indicar la cantidad de personas"],
      min: [1, "La cantidad de personas debe ser al menos 1"],
    },
    fecha: {
      type: Date,
      required: [true, "La fecha de la reserva es obligatoria"],
    },
    hora: {
      type: String,
      required: [true, "La hora de la reserva es obligatoria"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "La hora debe tener el formato HH:mm (24h)",
      ],
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
