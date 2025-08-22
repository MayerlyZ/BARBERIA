// Appointment.js - Archivo inicial

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    // Nombre del cliente
    client: {
        type: String,
        required: [true, "Client name is required"],
        trim: true,
        minlength: [3, "Client name must be at least 3 characters"],
        maxlength: [50, "Client name cannot exceed 50 characters"]
    },

    // Tipo de servicio solicitado
    service: {
        type: String,
        required: [true, "Service is required"],
        trim: true,
        minlength: [3, "Service must be at least 3 characters"],
        maxlength: [100, "Service cannot exceed 100 characters"]
    },

    // Fecha de la cita
    date: {
        type: Date,
        required: [true, "Date is required"],
        validate: {
            validator: function (value) {
                return value >= new Date(); // No se permiten fechas pasadas
            },
            message: "Date must be today or in the future"
        }
    },

    // Hora de la cita
    time: {
        type: String,
        required: [true, "Time is required"],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format (24h)"]
    },

    // Estado de la cita
    status: {
        type: String,
        enum: {
            values: ["pending", "confirmed", "cancelled"],
            message: "Status must be either: pending, confirmed, or cancelled"
        },
        default: "pending"
    },

    // Fecha de creación del registro
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
