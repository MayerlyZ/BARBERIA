import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import serviceRoutes from "./BACK/routes/serviceRoutes.js";
import customerRoutes from "./BACK/routes/customerRoutes.js";
import userRoutes from "./BACK/routes/userRoutes.js";
import conectarDB from "./BACK/config/db.js";

// Inicializar variables de entorno
dotenv.config();

// Conectar a MongoDB
conectarDB();

// Crear app Express
const app = express();

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes); // Rutas de usuario
app.use("/api/services", serviceRoutes); // Rutas de servicios
app.use("/api/customers", customerRoutes); // Rutas de clientes

// Levantar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


app.get("/health", (req, res) => {
  res.json({
    uptime: process.uptime(),
    dbState: mongoose.connection.readyState, // 1 = conectado
  });
});
