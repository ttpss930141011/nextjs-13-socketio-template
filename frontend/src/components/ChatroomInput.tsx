import useSocketStore from "@/store/socket";
import { ActionIcon, Group, Textarea, createStyles } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { KeyboardEvent, FC, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    targetSocketId: string;
};
const useStyles = createStyles((theme) => ({
    inputWithoutBorder: {
        border: "none",
    },
}));
const ChatroomInput: FC<Props> = ({ targetSocketId }) => {
    const { socket, emitMode, emit } = useSocketStore(); // deconstructing socket and its method from socket store
    const [message, setMessage] = useState(""); // message input value
    const messageInputRef = useRef<HTMLTextAreaElement>(null); // binding message input ref to focus
    const { classes } = useStyles();

    const sendMessage = () => {
        if (!message) return toast.error("Please enter a message");
        if (!socket?.connected) return toast.error("Please reconnect server first");
        if (!targetSocketId && emitMode === "private_message")
            return toast.error("Please enter a target socket id");

        switch (emitMode) {
            case "private_message": {
                const messageObj = {
                    from: socket?.id,
                    to: targetSocketId,
                    timestamp: Date.now(),
                    message,
                };
                emit("private_message", messageObj);
                break;
            }
            case "broadcast": {
                const broadcastObj = {
                    from: socket?.id,
                    timestamp: Date.now(),
                    message,
                };
                emit("broadcast", broadcastObj);
                break;
            }
            default:
                break;
        }
        setMessage("");
        messageInputRef.current?.focus();
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.altKey !== true && e.shiftKey !== true && e.ctrlKey !== true) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Group w={"100%"} align="center">
            <Textarea
                classNames={{ input: classes.inputWithoutBorder }}
                h={"100%"}
                w={"100%"}
                ref={messageInputRef}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                // radius="xl"
                // size="md"
                rightSection={
                    <ActionIcon size={32} radius="xl">
                        <IconSend size="1.5rem" stroke={1.5} onClick={sendMessage} />
                    </ActionIcon>
                }
                placeholder="Type something..."
                rightSectionWidth={42}
                onKeyDown={handleKeyDown}
            />
        </Group>
    );
};

export default ChatroomInput;
