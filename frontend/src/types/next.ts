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

export type SocketPrivateMessage = {
    from: string;
    to: string;
    message: string;
    timestamp: number;
};

export type SocketBroadcastMessage = {
    from: string;
    message: string;
    timestamp: number;
};

export type SocketOnlineUser = {
    socketId: string;
    name: string | null;
};

/**
 * Originally, I used SocketPrivateMessage type, and only distinguish whether the message is from me or not by checking the socket id in "from" property.
 * Then I can put the message on the right side of the ScrollArea if it is from me, and on the left side if it is not.
 * But I found when socket reconnects, the message on the right side will be moved to the left side because the "from" property is different.
 * So I decided to add "me" property to distinguish whether the message is from me or not, and use it to put the message on the right side or left side.
 */
export type MessageWithMe = {
    from: string;
    me: boolean;
    message: string;
    timestamp: number;
};
