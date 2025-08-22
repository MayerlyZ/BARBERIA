// appointmentController.js - Archivo inicial

import Appointment from "../models/Appointment.js";

// Crear nueva cita
export const createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();

        // Emitir evento a todos los clientes conectados
        io.emit("newBooking", newAppointment);

        res.status(201).json({
            ok: true,
            msg: "Cita creada correctamente",
            appointment: newAppointment,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al crear cita", error });
    }
};

// Obtener todas las citas
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json({ ok: true, appointments });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al obtener citas", error });
    }
};

// Actualizar cita
export const updateAppointments = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ ok: false, msg: "Cita no encontrada" });
        }

        // Emitir evento de actualización en tiempo real
        io.emit("updateSchedule", updatedAppointment);

        res.json({
            ok: true,
            msg: "Cita actualizada correctamente",
            appointment: updatedAppointment,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al actualizar cita", error });
    }
};

// Cancelar cita
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const cancelledAppointment = await Appointment.findByIdAndDelete(id);

        if (!cancelledAppointment) {
            return res.status(404).json({ ok: false, msg: "Cita no encontrada" });
        }

        // Emitir evento de cancelación en tiempo real
        io.emit("cancelBooking", cancelledAppointment);

        res.json({
            ok: true,
            msg: "Cita cancelada correctamente",
            appointment: cancelledAppointment,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al cancelar cita", error });
    }
};
