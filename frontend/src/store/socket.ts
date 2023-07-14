import { SOCKET_URL } from "@/config";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

type Store = {
    socketReady: boolean;
    socket: null | Socket;
    emit: (event: string, data: any) => void;
    disconnect: () => void;
};

const useSocketStore = create<Store>((set, get) => {
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
            set({ socketReady: true });
        })
        .on("disconnect", () => {
            set({ socketReady: false });
        });

    return {
        socketReady: false,
        socket: socket,
        emit: async (event: string, data: any) => {
            if (process.env.NODE_ENV === "development") {
                try {
                    const response = await fetch("/api/socket/message", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                    console.log("response", response);
                } catch (error) {
                    if (error instanceof Error) toast.error(error?.message);
                }
            } else {
                // This response needs to define on server at first.
                socket.emit(event, data, (response: any) => {
                    console.log(response.status); // ok
                });
            }
        },
        disconnect: () => {
            const { socket } = get();
            if (socket) {
                socket.disconnect();
                set({ socket: null });
            }
        },
    };
});

export default useSocketStore;
