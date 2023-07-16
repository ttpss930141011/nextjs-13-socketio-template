"use client";
import {
    Button,
    createStyles,
    Card,
    Container,
    Group,
    Text,
    Divider,
    Input,
    ScrollArea,
    TextInput,
    ActionIcon,
    Popover,
    CopyButton,
    Tooltip,
} from "@mantine/core";
import {
    IconArrowRight,
    IconCheck,
    IconCopy,
    IconSettings,
    IconEdit,
    IconPlugOff,
} from "@tabler/icons-react";
import NameModal from "@/components/NameModal";
import { useDisclosure } from "@mantine/hooks";
import useSocketStore from "@/store/socket";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import useBasicStore from "@/store/basic";
import { SocketMessage } from "@/types/next";

const useStyles = createStyles((theme) => ({
    rightMessageField: {
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "nowrap",
        alignItems: "center",
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
        alignItems: "center",
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
}));

export default function Home() {
    const storeName = useBasicStore((state) => state.name);
    const { socket, emit, disconnect } = useSocketStore((state) => state);

    const chatViewportRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string | null>(null); // avoiding Next.js hydration error
    const [socketId, setSocketId] = useState<string | undefined>(); // avoiding Next.js hydration error
    const [targetSocketId, setTargetSocketId] = useState<string>("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<SocketMessage[]>([]);

    const [opened, { open, close }] = useDisclosure(false);
    const { classes } = useStyles();

    const scrollToBottom = () => {
        console.log("scrollToBottom", chatViewportRef.current?.scrollHeight);
        chatViewportRef?.current?.scrollTo({
            top: chatViewportRef.current.scrollHeight,
            behavior: "smooth",
        });
    };
    const sendMessage = () => {
        if (!socketId || !message) return;
        emit("message", { from: socketId, to: targetSocketId, timestamp: Date.now(), message });
        setMessage("");
        inputRef.current?.focus();
    };

    useEffect(() => {
        setName(storeName);
        if (!storeName) open();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    useEffect(() => {
        setSocketId(socket?.id);
        socket?.on("message", (message: SocketMessage) => {
            console.log("message", message);
            setMessages((state) => [...state, message]);
        });
        return () => {
            socket?.off("message");
        };
    }, [socket]);

    useLayoutEffect(() => {
        scrollToBottom(); // DOM更新完畢後，才執行scrollToBottom
    }, [messages]);

    return (
        <>
            <Container pt="sm" size="md">
                <Card shadow="sm" padding="sm" radius="md" withBorder>
                    <Group position="apart" mt="xs" mb="xs" className="flex flex-row flex-nowrap">
                        <Group className="flex flex-row flex-nowrap">
                            <Text size="xl" weight={500}>
                                {name}
                            </Text>
                            <Popover width={170} position="bottom" withArrow shadow="md">
                                <Popover.Target>
                                    <ActionIcon variant="outline">
                                        <IconSettings size="1rem" />
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Group className="justify-between">
                                        <Text size="sm">SocketID</Text>
                                        {socketId && (
                                            <CopyButton value={socketId} timeout={2000}>
                                                {({ copied, copy }) => (
                                                    <Tooltip
                                                        label={
                                                            copied ? `Copied: ${socketId}` : "Copy"
                                                        }
                                                        withArrow
                                                        position="right"
                                                    >
                                                        <ActionIcon
                                                            color={copied ? "teal" : "gray"}
                                                            onClick={copy}
                                                        >
                                                            {copied ? (
                                                                <IconCheck size="1rem" />
                                                            ) : (
                                                                <IconCopy size="1rem" />
                                                            )}
                                                        </ActionIcon>
                                                    </Tooltip>
                                                )}
                                            </CopyButton>
                                        )}
                                    </Group>
                                    <Group className="justify-between">
                                        <Text size="sm">Actions</Text>
                                        <Group className="gap-1">
                                            <Tooltip label="Change name" withArrow position="right">
                                                <ActionIcon color="yellow" onClick={open}>
                                                    <IconEdit size="1rem" />
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip label="Disconnect" withArrow position="right">
                                                <ActionIcon color="red" onClick={disconnect}>
                                                    <IconPlugOff size="1rem" />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                    </Group>
                                </Popover.Dropdown>
                            </Popover>
                        </Group>
                        <Group w={220} className="flex flex-row flex-nowrap">
                            <Text w={20}>To:</Text>
                            <Input
                                w={170}
                                placeholder="Your target Socket ID"
                                value={targetSocketId}
                                onChange={(e) => setTargetSocketId(e.target.value)}
                            />
                        </Group>
                    </Group>

                    <Divider />
                    <ScrollArea h={"80vh"} offsetScrollbars viewportRef={chatViewportRef}>
                        {messages.map((message, index) => {
                            return (
                                <div
                                    className={
                                        message.from === socketId
                                            ? classes.rightMessageField
                                            : classes.leftMessageField
                                    }
                                    key={message.timestamp + index}
                                >
                                    <Text
                                        className={
                                            message.from === socketId
                                                ? classes.rightMessage
                                                : classes.leftMessage
                                        }
                                    >
                                        {message.message}
                                    </Text>
                                </div>
                            );
                        })}
                    </ScrollArea>
                    <Divider />

                    <TextInput
                        ref={inputRef}
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

            <NameModal opened={opened} onClose={close} />
        </>
    );
}
