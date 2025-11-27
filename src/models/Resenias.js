import mongoose from "mongoose";

const reseniaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  comentario: {
    type: String,
    required: true,
    trim: true,
  },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  fecha: {
    type: Date,
    default: Date.now
  },
});

const ReseniaModel = mongoose.model("Resenia", reseniaSchema);

export default ReseniaModel;
