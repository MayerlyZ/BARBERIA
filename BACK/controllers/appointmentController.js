// appointmentController.js - Archivo inicial

import Appointment from "../models/appointment.js";
import { io } from "../server.js"; // Importamos io para emitir eventos en tiempo real

// Crear nueva cita
export const crearCita = async (req, res) => {
    try {
        const nuevaCita = new Appointment(req.body);
        await nuevaCita.save();

        // Emitir evento a todos los clientes conectados
        io.emit("nuevaReserva", nuevaCita);

        res.status(201).json({
            ok: true,
            msg: "Cita creada correctamente",
            cita: nuevaCita,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al crear cita", error });
    }
};

// Obtener todas las citas
export const obtenerCitas = async (req, res) => {
    try {
        const citas = await Appointment.find();
        res.json({ ok: true, citas });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al obtener citas", error });
    }
};

// Actualizar cita
export const actualizarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const citaActualizada = await Appointment.findByIdAndUpdate(id, req.body, { new: true });

        if (!citaActualizada) {
            return res.status(404).json({ ok: false, msg: "Cita no encontrada" });
        }

        // Emitir evento de actualización en tiempo real
        io.emit("actualizarHorarios", citaActualizada);

        res.json({
            ok: true,
            msg: "Cita actualizada correctamente",
            cita: citaActualizada,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al actualizar cita", error });
    }
};

// Cancelar cita
export const cancelarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const citaCancelada = await Appointment.findByIdAndDelete(id);

        if (!citaCancelada) {
            return res.status(404).json({ ok: false, msg: "Cita no encontrada" });
        }

        // Emitir evento de cancelación en tiempo real
        io.emit("cancelarReserva", citaCancelada);

        res.json({
            ok: true,
            msg: "Cita cancelada correctamente",
            cita: citaCancelada,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al cancelar cita", error });
    }
};
