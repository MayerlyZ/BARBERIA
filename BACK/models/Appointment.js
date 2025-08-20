// Appointment.js - Archivo inicial

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true,  
        trim: true
    },
    servicio: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ["pendiente", "confirmada", "cancelada"],
        default: "pendiente"
    },
    creadoEn: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
