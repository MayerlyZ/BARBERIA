// userRoutes.js - Archivo inicial
import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"; // Importar middleware de autenticación

const router = express.Router();

// Rutas de usuario
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

// Ruta protegida de prueba
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Acceso concedido a ruta protegida",
    user: req.user, // esto te mostrará la info que guardaste en el token
  });
});

export default router;