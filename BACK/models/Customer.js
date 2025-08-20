// Customer.js - Archivo inicial
// models/Customer.js
import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del cliente es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email del cliente es obligatorio"],
    unique: true,
    match: [/.+\@.+\..+/, "Por favor ingresa un email válido"],
  },
  phone: {
    type: String,
    required: [true, "El teléfono del cliente es obligatorio"],
    match: [/^\d{10}$/, "El teléfono debe tener 10 dígitos"],
  },
},
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;