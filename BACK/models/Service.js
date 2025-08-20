// Service.js - Archivo inicial
// models/Service.js
import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del servicio es obligatorio"],
  },
  description: {
    type: String,
    trim: true,
    min: [10, "La descripción debe tener al menos 10 caracteres"],

  },
  price: {
    type: Number,
    required: [true, "El precio del servicio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
  duration: {
    type: Number,
    required: [true, "La duración del servicio es obligatoria"],
    min: [1, "La duración debe ser al menos 1 minuto"],
  },
},
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
