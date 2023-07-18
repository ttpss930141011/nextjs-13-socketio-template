"use client";
import {
    Group,
    Text,
    Input,
    ActionIcon,
    Popover,
    CopyButton,
    Tooltip,
    Avatar,
    Indicator,
    Menu,
} from "@mantine/core";
import {
    IconPlug,
    IconCheck,
    IconCopy,
    IconEdit,
    IconPlugOff,
    IconChevronDown,
    IconUserCog,
    IconUser,
} from "@tabler/icons-react";
import { SetStateAction, Dispatch, FC, useEffect, useState } from "react";
import NameModal from "./NameModal";
import useBasicStore from "@/store/basic";
import { useDisclosure } from "@mantine/hooks";
import useSocketStore from "@/store/socket";
import { environment } from "@/config";

type Props = {
    targetSocketId: string;
    setTargetSocketId: Dispatch<SetStateAction<string>>;
};

const ChatroomTitle: FC<Props> = ({ targetSocketId, setTargetSocketId }) => {
    const { socket, connect, disconnect } = useSocketStore(); // deconstructing socket and its method from socket store
    const storeName = useBasicStore((state) => state.name); // get name from basic store
    const [name, setName] = useState<string | null>(null); // avoiding Next.js hydration error
    const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure(false); // control change name modal open/close
    const [popoverOpened, setPopoverOpened] = useState(false); // control popover open/close
    const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>({}); // online users

    useEffect(() => {
        setName(storeName);
        if (!storeName) modalOpen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    useEffect(() => {
        socket?.on("online_user", (onlineUsers: Record<string, string>) => {
            setOnlineUsers(onlineUsers);
            console.log("online_user", onlineUsers);
        });
        return () => {
            socket?.off("online_user");
        };
    }, [socket]);

    return (
        <>
            <Group position="apart" mt="xs" mb="xs" className="flex flex-row flex-nowrap">
                <Group className="flex flex-row flex-nowrap">
                    <Indicator
                        inline
                        size={16}
                        offset={5}
                        position="bottom-end"
                        color={socket?.connected ? "teal" : "red"}
                        withBorder
                    >
                        <Avatar src={null} alt="User" color="blue" radius="xl" w="fit-content">
                            {name}
                        </Avatar>
                    </Indicator>

                    <Popover
                        width="fit-content"
                        position="bottom"
                        withArrow
                        shadow="md"
                        opened={popoverOpened}
                        onChange={setPopoverOpened}
                    >
                        <Popover.Target>
                            <ActionIcon
                                variant="subtle"
                                onClick={() => setPopoverOpened((open) => !open)}
                            >
                                <IconChevronDown size="1rem" />
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Group position="apart">
                                <Text size="sm">SocketID</Text>
                                {socket?.id && (
                                    <CopyButton value={socket.id} timeout={2000}>
                                        {({ copied, copy }) => (
                                            <Tooltip
                                                label={copied ? `Copied: ${socket.id}` : "Copy"}
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
                            <Group position="apart">
                                <Text size="sm">Actions</Text>
                                <Group className="gap-1">
                                    <Tooltip label="Change name" withArrow position="right">
                                        <ActionIcon
                                            color="yellow"
                                            onClick={() => {
                                                modalOpen();
                                                setPopoverOpened(false);
                                            }}
                                        >
                                            <IconEdit size="1rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                    {
                                        // if socket is not connected, show connect button
                                        socket?.connected ? (
                                            <Tooltip label="Disconnect" withArrow position="right">
                                                <ActionIcon color="red" onClick={disconnect}>
                                                    <IconPlugOff size="1rem" />
                                                </ActionIcon>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip label="Connect" withArrow position="right">
                                                <ActionIcon color="blue" onClick={connect}>
                                                    <IconPlug size="1rem" />
                                                </ActionIcon>
                                            </Tooltip>
                                        )
                                    }
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
                        onChange={(e) => setTargetSocketId(e.currentTarget.value)}
                    />
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon>
                                <IconUserCog size="1.125rem" />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>
                                {environment === "development" ? "Not available in development" : "Online user"}
                            </Menu.Label>
                            {socket?.connected &&
                                Object.keys(onlineUsers)
                                    .filter((socketId) => socketId !== socket?.id)
                                    .map((socketId) => (
                                        <Menu.Item
                                            key={socketId}
                                            onClick={() => setTargetSocketId(socketId)}
                                        >
                                            <Group
                                                position="apart"
                                                className="flex flex-row flex-nowrap"
                                            >
                                                <Indicator
                                                    inline
                                                    size={16}
                                                    offset={5}
                                                    position="bottom-end"
                                                    color="teal"
                                                    withBorder
                                                >
                                                    <Avatar
                                                        src={null}
                                                        alt="User"
                                                        color="blue"
                                                        radius="xl"
                                                        w="fit-content"
                                                    >
                                                        <IconUser size="1.5rem" />
                                                    </Avatar>
                                                </Indicator>
                                                <Text>{onlineUsers[socketId]}</Text>
                                            </Group>
                                        </Menu.Item>
                                    ))}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
            <NameModal opened={modalOpened} onClose={modalClose} />
        </>
    );
};

export default ChatroomTitle;
