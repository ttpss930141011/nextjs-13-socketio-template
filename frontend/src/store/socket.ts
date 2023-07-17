import { SOCKET_URL } from "@/config";
import { SocketMessage } from "@/types/next";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

type Store = {
    socket: null | Socket;
    emit: (event: string, data: SocketMessage) => void;
    connect: () => void;
    disconnect: () => void;
};

const useSocketStore = create<Store>((set, get) => {
    return {
        socket: null,
        emit: async (event: string, data: SocketMessage) => {
            console.log("emit", event, data);
            if (process.env.NODE_ENV === "development") {
                try {
                    const response = await fetch("/api/socket/message", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                } catch (error) {
                    if (error instanceof Error) toast.error(error?.message);
                }
            } else {
                const { socket } = get();
                if (!socket) return toast.error("Socket not connected");

                // This callback response needs to define on server at first.
                socket.emit(event, data, (response: { ok: boolean }) => {
                    if (!response.ok) toast.error("Something went wrong");
                });
            }
        },
        connect: () => {
            const { socket } = get();
            if (SOCKET_URL === undefined) return toast.error("Socket URL is undefined");
            if (socket) {
                console.log("Socket already connected", socket);
                toast.error("Socket already connected");
            } else {
                console.log("Connecting to socket", SOCKET_URL);
                const socket = io(
                    SOCKET_URL,
                    process.env.NODE_ENV === "development"
                        ? {
                              path: "/api/socket/socketio",
                              addTrailingSlash: false,
                          }
                        : {}
                );
                socket
                    .on("connect", () => {
                        console.log("SOCKET CONNECTED!", socket.id);
                        set({ socket });
                    })
                    .on("disconnect", () => {
                        console.log("SOCKET DISCONNECTED!");
                        set({ socket: null });
                    });
            }
        },
        disconnect: () => {
            const { socket } = get();
            if (socket) {
                socket.disconnect();
                set({ socket: null });
            } else {
                toast.error("Socket not connected");
            }
        },
    };
});

export default useSocketStore;
