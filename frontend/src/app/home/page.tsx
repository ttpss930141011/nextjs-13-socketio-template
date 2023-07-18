"use client";
import {
    createStyles,
    Card,
    Container,
    Text,
    Divider,
    ScrollArea,
    TextInput,
    ActionIcon,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import useSocketStore from "@/store/socket";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { MessageWithMe, SocketMessage } from "@/types/next";
import { toast } from "react-hot-toast";
import ChatroomTitle from "@/components/ChatroomTitle";

const useStyles = createStyles((theme) => ({
    rightMessageField: {
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "nowrap",
        // alignItems: "center",
        width: "100%",
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    rightMessage: {
        width: "fit-content",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.green[2],
    },
    leftMessageField: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        // alignItems: "center",
        width: "100%",
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    leftMessage: {
        width: "fit-content",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[2],
    },
    timestamp: {
        display: "flex",
        fontSize: theme.fontSizes.xs,
        color: theme.colors.gray[5],
        marginLeft: theme.spacing.xs,
        marginRight: theme.spacing.xs,
        alignItems: "flex-end",
    },
}));

export default function Home() {
    const { socket, connect, emit } = useSocketStore((state) => state); // deconstructing socket and its method from socket store

    const chatViewportRef = useRef<HTMLDivElement>(null); // binding chat viewport ref to scroll to bottom
    const messageInputRef = useRef<HTMLInputElement>(null); // binding message input ref to focus

    const [targetSocketId, setTargetSocketId] = useState<string>(""); // target socket id input value
    const [message, setMessage] = useState(""); // message input value
    const [messages, setMessages] = useState<MessageWithMe[]>([]); // show messages on ScrollArea

    const { classes } = useStyles();

    const scrollToBottom = () => {
        chatViewportRef?.current?.scrollTo({
            top: chatViewportRef.current.scrollHeight,
            behavior: "smooth",
        });
    };
    const sendMessage = () => {
        if (!message) return toast.error("Please enter a message");
        if (!socket?.connected) return toast.error("Please reconnect server first");
        if (!targetSocketId) return toast.error("Please enter a target socket id");
        emit("message", { from: socket?.id, to: targetSocketId, timestamp: Date.now(), message });
        setMessage("");
        messageInputRef.current?.focus();
    };

    useEffect(() => {
        connect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("socket", socket?.id);
        socket?.on("message", (message: SocketMessage) => {
            // console.log("message", message);
            setMessages((state) => [...state, { ...message, me: message.from === socket?.id }]);
        });
        return () => {
            socket?.off("message");
        };
    }, [socket]);

    useLayoutEffect(() => {
        scrollToBottom(); // Execute after DOM render
    }, [messages]);

    return (
        <>
            <Container pt="sm" size="md">
                <Card shadow="sm" padding="sm" radius="md" withBorder>
                    <ChatroomTitle
                        targetSocketId={targetSocketId}
                        setTargetSocketId={setTargetSocketId}
                    />
                    <Divider />
                    <ScrollArea h={"80vh"} offsetScrollbars viewportRef={chatViewportRef}>
                        {messages.map((message, index) => {
                            return (
                                <div
                                    className={
                                        message.me
                                            ? classes.rightMessageField
                                            : classes.leftMessageField
                                    }
                                    key={message.timestamp + index}
                                >
                                    <Text
                                        className={
                                            message.me ? classes.rightMessage : classes.leftMessage
                                        }
                                    >
                                        {message.message}
                                    </Text>
                                    <Text size="xs" className={classes.timestamp}>
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </Text>
                                </div>
                            );
                        })}
                    </ScrollArea>
                    <Divider />

                    <TextInput
                        ref={messageInputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        mt={10}
                        radius="xl"
                        size="md"
                        rightSection={
                            <ActionIcon size={32} radius="xl" variant="filled">
                                <IconArrowRight size="1.1rem" stroke={1.5} onClick={sendMessage} />
                            </ActionIcon>
                        }
                        placeholder="Type something..."
                        rightSectionWidth={42}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage();
                        }}
                    />
                </Card>
            </Container>
        </>
    );
}
