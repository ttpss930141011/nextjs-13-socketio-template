import { NextApiResponseServerIO } from "@/types/next";
import { NextApiRequest } from "next";

const message = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
        // get message
        const message = req.body;

        // dispatch to channel "message"
        res?.socket?.server?.io?.emit("message", message);

        // return message
        res.status(201).json(message);
    }
};

export default message;
