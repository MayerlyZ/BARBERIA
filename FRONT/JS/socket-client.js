// socket-client.js
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

const server_URL = import.meta.env.VITE_SOCKET_URL;

// Crear conexi�n con el servidor
export const socket = io(server_URL, {
    transports: ["websocket"],
    autoConnect: true,
});

// Detectar conexi�n establecida
socket.on("connect", () => {
    console.log("Conectado al servidor con ID:", socket.id);

  // Enviar evento de prueba
    socket.emit("testEvent", { msg: "Hola servidor, soy el cliente" });
});

// Recibir respuesta del servidor al evento de prueba
socket.on("testEventResponse", (data) => {
    console.log("Respuesta del servidor:", data);
});

/* ======================================================
    \U0001f514 Eventos en tiempo real para reservas y horarios
====================================================== */

// \u2705 Cuando se confirma una nueva reserva al cliente que la hizo
socket.on("reservaConfirmada", (data) => {
    console.log("Tu reserva fue confirmada:", data);
  // Aqui podrias actualizar la UI del cliente (ej: mostrar mensaje de �xito)
});

// \U0001f4e2 Cuando otro cliente hace una reserva y nos notifican
socket.on("reservaAgregada", (data) => {
    console.log(" Nueva reserva a�adida:", data);
  // Aqui podrias refrescar la lista de reservas en la UI
});

// \U0001f552 Cuando se actualizan los horarios en el servidor
socket.on("horariosActualizados", (data) => {
    console.log("0001f552 Horarios actualizados:", data);
  // Aqui deberias refrescar los horarios disponibles en tu UI
});

// \u274c Cuando alguien cancela una reserva
socket.on("reservaCancelada", (data) => {
    console.log("Una reserva fue cancelada:", data);
  // Aqui puedes liberar el horario en tu calendario o lista
});
