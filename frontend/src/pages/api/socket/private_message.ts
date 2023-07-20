import { NextApiResponseServerIO, SocketPrivateMessage } from "@/types/next";
import { NextApiRequest } from "next";

const private_message = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
        // get message
        const {
            from: sourceSocketId,
            to: targetSocketId,
            timestamp,
            message,
        } = req.body as SocketPrivateMessage;

        // dispatch to channel "message"
        res?.socket?.server?.io?.to(targetSocketId).emit("private_message", {
            from: sourceSocketId,
            to: targetSocketId,
            message,
            timestamp,
        } as SocketPrivateMessage);
        res?.socket?.server?.io?.to(sourceSocketId).emit("private_message", {
            from: sourceSocketId,
            to: targetSocketId,
            message,
            timestamp,
        } as SocketPrivateMessage);

        // return message
        res.status(201).json(message);
    }
};

export default private_message;
