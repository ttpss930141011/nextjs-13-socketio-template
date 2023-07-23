import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "@/types/next";

export const config = {
    api: {
        bodyParser: false,
    },
};

const onlineUsers = new Map<string, string>();
let isEmitting = false;
let sendOnlineUsers: NodeJS.Timeout;

const socketio = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log("MOCK SERVER: First connect on socket.io");
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socket/socketio",
            addTrailingSlash: false,
        });
        io.on("connection", (socket) => {
            console.log("MOCK SERVER: user connected, online user count:", onlineUsers.size);

            socket.on("join", (data) => {
                const { socketId, name = socketId } = data;
                onlineUsers.set(socketId, name);
                // console.log(
                //   'MOCK SERVER: user joined, online user count:',
                //   'socketId: ',
                //   socketId,
                //   'name: ',
                //   name,
                // );
            });

            socket.on("broadcast", (broadcast, callback) => {
                console.log("MOCK SERVER: Broadcast ", broadcast);
                io.emit("broadcast", broadcast);
                if (callback) {
                    callback({
                        ok: true,
                    });
                }
            });

            socket.on("private_message", (message, callback) => {
                console.log("MOCK SERVER: private_message", message);
                const { from: sourceSocketId, to: targetSocketId } = message;
                io.to(targetSocketId).emit("private_message", message);
                io.to(sourceSocketId).emit("private_message", message);
                if (callback) {
                    callback({
                        ok: true,
                    });
                }
            });

            socket.on("disconnect", () => {
                onlineUsers.delete(socket.id);
                console.log(
                    "MOCK SERVER: user disconnected, online user count:",
                    onlineUsers.size
                );
                if (isEmitting && onlineUsers.size === 0) {
                    clearInterval(sendOnlineUsers);
                    isEmitting = false;
                }
            });

            if (!isEmitting) {
                sendOnlineUsers = setInterval(
                    () => io.emit("online_user", Object.fromEntries(onlineUsers)),
                    5000
                );
                isEmitting = true;
            }
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
    } else {
        console.log("MOCK SERVER: Socket.io already running");
    }
    res.end();
};

export default socketio;
