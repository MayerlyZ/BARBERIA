// appointmentRoutes.js - Archivo inicial

import express from "express";
import { createAppointment, getAppointments, updateAppointments, cancelAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments); // Obtenr todas las citas
router.post("/", createAppointment); // Creacion de citas
router.put("/:id", updateAppointments); // Editar las citas
router.get("/:id", cancelAppointment); // Cancelar citas

export default router;
