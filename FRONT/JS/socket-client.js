// socket-client.js
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const server_URL = import.meta.env.VITE_SOCKET_URL;

// Crear conexión con el servidor
export const socket = io(server_URL, {
    transports: ["websocket"],
    autoConnect: true,
});

// Detectar conexión establecida
socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);

    // Enviar evento de prueba
    socket.emit("testEvent", { msg: "Hello server, I'm the client" });
});

// Recibir respuesta del servidor al evento de prueba
socket.on("testEventResponse", (data) => {
    console.log("Server response:", data);
});

/* ======================================================
    Eventos en tiempo real para reservas y horarios
====================================================== */

// Cuando se confirma una nueva reserva al cliente que la hizo
socket.on("reservationConfirmed", (data) => {
    console.log("Your reservation was confirmed:", data);
    // Aqui podrias actualizar la UI del cliente (ej: mostrar mensaje de éxito)
});

//  Cuando otro cliente hace una reserva y nos notifican
socket.on("reservationAdded", (data) => {
    console.log("New reservation added:", data);
    // Aqui podrias refrescar la lista de reservas en la UI
});

//  Cuando se actualizan los horarios en el servidor
socket.on("schedulesUpdated", (data) => {
    console.log("Schedules updated:", data);
    // Aqui deberias refrescar los horarios disponibles en tu UI
});

// Cuando alguien cancela una reserva
socket.on("reservationCancelled", (data) => {
    console.log("A reservation was cancelled:", data);
    // Aqui puedes liberar el horario en tu calendario o lista
});
