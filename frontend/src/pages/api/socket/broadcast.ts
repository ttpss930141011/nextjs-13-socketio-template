import { NextApiResponseServerIO, SocketBroadcastMessage } from "@/types/next";
import { NextApiRequest } from "next";

const broadcast = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
        // get message
        const { from: sourceSocketId, timestamp, message } = req.body as SocketBroadcastMessage;
        console.log("PRODUCTION SERVER: Broadcast ", message)
        // dispatch to channel "message"
        res?.socket?.server?.io?.emit("broadcast", {
            from: sourceSocketId,
            message,
            timestamp,
        } as SocketBroadcastMessage);
        // return message
        res.status(201).json(message);
    }
};

export default broadcast;
