import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const userSockets = new Map();

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", (message, callback) => {
        console.log(message);
        io.emit("message", message);
        callback({
            status: "ok",
        });
    });

    socket.on("disconnect", () => {
        // Remove the user ID mapping when the socket disconnects
        userSockets.forEach((socketId, userId) => {
            if (socketId === socket.id) {
                userSockets.delete(userId);
            }
        });
    });

    socket.on("clear", () => io.emit("clear"));
});

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});
