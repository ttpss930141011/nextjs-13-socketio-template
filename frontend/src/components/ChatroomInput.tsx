import useSocketStore from "@/store/socket";
import { ActionIcon, Group, Textarea, createStyles } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { KeyboardEvent, FC, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    targetSocketId: string;
};
const useStyles = createStyles((theme) => ({
    Textarea: {
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
        <Group w={"100%"} display={"flex"} className="gap-0" position="apart" noWrap>
            <Textarea
                w={"100%"}
                classNames={{ input: classes.Textarea }}
                minRows={3}
                maxRows={7}
                ref={messageInputRef}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="Type something..."
                onKeyDown={handleKeyDown}
            />
            <ActionIcon radius="xl">
                <IconSend stroke={1.5} onClick={sendMessage} />
            </ActionIcon>
        </Group>
    );
};

export default ChatroomInput;
