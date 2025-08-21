// appointmentSocket.js - Archivo inicial

export default function appointmentSocket(io) {
    // Cuando un cliente se conecta
    io.on("connection", (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        /**
         * 🟢 Evento: nuevaReserva
         * - Un cliente crea una nueva cita
         * - Notificamos al cliente que la envió
         * - Hacemos broadcast a los demás clientes
         */
        socket.on("nuevaReserva", (reserva) => {
            console.log("Nueva reserva recibida:", reserva);

            // Confirmar al cliente que envió
            socket.emit("reservaConfirmada", {
                ok: true,
                reserva
            });

            // Notificar a todos los demás
            socket.broadcast.emit("reservaAgregada", reserva);
        });

        /**
         * 🟡 Evento: actualizarHorarios
         * - Se actualizan horarios disponibles (ej: bloqueo de horas ocupadas)
         * - Se notifica a todos los clientes
         */
        socket.on("actualizarHorarios", (horarios) => {
            console.log(" Actualización de horarios:", horarios);

            // Enviar a TODOS (incluyendo quien lo envió)
            io.emit("horariosActualizados", horarios);
        });

        /**
         * 🔴 Evento: cancelarReserva
         * - Un cliente cancela una cita
         * - Se notifica a todos los clientes conectados
         */
        socket.on("cancelarReserva", (reservaId) => {
            console.log("Cancelación de reserva ID:", reservaId);

            // Notificar a todos
            io.emit("reservaCancelada", reservaId);
        });

        // Detectar desconexión
        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}
