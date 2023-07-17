import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

export type SocketMessage = {
    from: string;
    to: string;
    message: string;
    timestamp: number;
};

/**
 * Originally, I used SocketMessage type, and only distinguish whether the message is from me or not by checking the socket id in "from" property.
 * Then I can put the message on the right side of the ScrollArea if it is from me, and on the left side if it is not.
 * But I found when socket reconnects, the message on the right side will be moved to the left side because the "from" property is different.
 * So I decided to add "me" property to distinguish whether the message is from me or not, and use it to put the message on the right side or left side.
 */
export interface MessageWithMe extends SocketMessage {
    me: boolean;
}
