import mongoose from "mongoose";

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
      max:35
    },
    cantidadPersonas: {
      type: Number,
      required: true,
      min: 1,
      max:65
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
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

reservaSchema.index({ mesa: 1, fecha: 1, hora: 1 }, { unique: true });

const Reserva = mongoose.model("Reserva", reservaSchema);
export default Reserva;