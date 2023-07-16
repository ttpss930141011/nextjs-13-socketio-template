import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "@/types/next";

export const config = {
    api: {
        bodyParser: false,
    },
};

const socketio = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log("First connect on socket.io");
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socket/socketio",
            addTrailingSlash: false,
        });
        io.on("connect", (socket) => {
            console.log("SOCKET CONNECTED!", socket.id);
        }).on("disconnect", () => {
            console.log("SOCKET DISCONNECTED!");
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
    } else {
        console.log("Socket.io already running");
    }
    res.end();
};

export default socketio;
