import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
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



// Socket.IO
const server = http.createServer(app);

// Usamos variables de entorno
const Port = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Evento de conexión
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Evento testEvent
  socket.on("testEvent", (data) => {
    console.log("testEvent recibido:", data);
    socket.emit("testEventResponse", { msg: "Hola cliente, recibí tu evento" });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Iniciar servidor
server.listen(Port, () => {
  console.log(`Servidor corriendo en http://localhost:${Port}`);
});
