"use client";
import {
    Button,
    Card,
    Container,
    Group,
    Text,
    Divider,
    Input,
    ScrollArea,
    TextInput,
    ActionIcon,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import NameModal from "@/components/NameModal";
import { useDisclosure } from "@mantine/hooks";
import useSocketStore from "@/store/socket";
import { useEffect, useRef, useState } from "react";
import useBasicStore from "@/store/basic";

export default function Home() {
    const storeName = useBasicStore((state) => state.name);
    const [socket, emit] = useSocketStore((state) => [state.socket, state.emit]);

    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string | null>(null); // avoiding Next.js hydration error
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const [opened, { open, close }] = useDisclosure(false);

    const sendMessage = () => {
        emit("message", message);
        setMessages([...messages, message]);
        setMessage("");
        inputRef.current?.focus();
    };

    useEffect(() => {
        setName(storeName);
        if (!storeName) open();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    useEffect(() => {
        socket?.on("message", (data) => {
            console.log("message", data);
        });
        return () => {
            socket?.off("message");
        };
    }, [socket]);

    return (
        <>
            <Container pt="sm" size="md">
                <Card shadow="sm" padding="sm" radius="md" withBorder>
                    <Group position="apart" mt="xs" mb="xs">
                        <Group>
                            <Text size="xl" weight={500} suppressHydrationWarning={true}>
                                {name}
                            </Text>
                            <Button size="xs" radius="md" onClick={open} variant="light">
                                Change name
                            </Button>
                        </Group>
                        <Input placeholder="Your target Socket ID" />
                    </Group>

                    <Divider />
                    <ScrollArea h={"80vh"} offsetScrollbars>
                        {messages.map((message, index) => (
                            <Text key={index}>{message}</Text>
                        ))}
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
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                    />
                </Card>
            </Container>

            <NameModal opened={opened} onClose={close} />
        </>
    );
}
