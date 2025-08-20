// socket-client.js - Archivo inicial

// cliente-servidor
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const server_URL = import.meta.env.VITE_SOCKET_URL


// Crear conexion
export const socket = io(server_URL, {
    transports: ["websocket"],
    autoConnect: true
});

// Detectar conexion
socket.on("connect", () => {
    console.log("Conectado al servidor con ID:", socket.id);
    
    // Enviar evento ded prueba
    socket.emit("testEvent", {msg: "Hola servidor, soy el cliente"});
});

// Rrcibir respuesta del servidor
socket.on("testEventResponse", (data) => {
    console.log("Respuesta del servidor:", data);
});
