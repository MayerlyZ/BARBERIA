// appointmentSocket.js - Initial file

export default function appointmentSocket(io) {
    // Cuando un cliente se conecta
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        /**
         * 🟢 Event: newReservation
         * - Un cliente crea una nueva cita
         * - Notificamos al cliente que la envió
         * - Hacemos broadcast a los demás clientes
         */
        socket.on("newReservation", (reservation) => {
            console.log("New reservation received:", reservation);

            // Confirmar al cliente que envió
            socket.emit("reservationConfirmed", {
                ok: true,
                reservation
            });

            // Notificar a todos los demás
            socket.broadcast.emit("reservationAdded", reservation);
        });

        /**
         * 🟡 Event: updateSchedules
         * - Se actualizan horarios disponibles (ej: bloqueo de horas ocupadas)
         * - Se notifica a todos los clientes
         */
        socket.on("updateSchedules", (schedules) => {
            console.log("Schedules updated:", schedules);

            // Enviar a TODOS (incluyendo quien lo envió)
            io.emit("schedulesUpdated", schedules);
        });

        /**
         * 🔴 Event: cancelReservation
         * - Un cliente cancela una cita
         * - Se notifica a todos los clientes conectados
         */
        socket.on("cancelReservation", (reservationId) => {
            console.log("Reservation cancelled ID:", reservationId);

            // Notificar a todos
            io.emit("reservationCancelled", reservationId);
        });

        // Detectar desconexión
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
