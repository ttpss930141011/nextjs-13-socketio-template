import { NextApiResponseServerIO, SocketMessage } from "@/types/next";
import { NextApiRequest } from "next";

const message = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
        // get message
        const {
            from: sourceSocketId,
            to: targetSocketId,
            timestamp,
            message,
        } = req.body as SocketMessage;

        // dispatch to channel "message"
        res?.socket?.server?.io?.to(targetSocketId).emit("message", {
            from: sourceSocketId,
            to: targetSocketId,
            message,
            timestamp,
        } as SocketMessage);
        res?.socket?.server?.io?.to(sourceSocketId).emit("message", {
            from: sourceSocketId,
            to: targetSocketId,
            message,
            timestamp,
        } as SocketMessage);

        // return message
        res.status(201).json(message);
    }
};

export default message;
