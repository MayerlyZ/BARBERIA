// appointmentRoutes.js - Archivo inicial

import express from "express";
import { crearCita, obtenerCitas, editarCitas, cancelarCita } from "../controllers/appointmentController.js";

const router = express.Router();

router.get ("/", obtenerCitas); // Obtenr todas las citas
router.post("/", crearCita); // Creacion de citas
router.put("/:id", editarCitas); // Editar las citas
router.get("/:id", cancelarCita); // Cancelar citas

export default router;
