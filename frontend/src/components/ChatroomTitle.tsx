"use client";
import {
    Group,
    Text,
    ActionIcon,
    Popover,
    CopyButton,
    Tooltip,
    Avatar as MantineAvatar,
    Indicator,
    Menu,
    SegmentedControl,
    Center,
    Box,
    TextInput,
    Loader,
} from "@mantine/core";
import {
    IconPlug,
    IconCheck,
    IconCopy,
    IconPlugOff,
    IconChevronDown,
    IconUserCog,
    IconUser,
    IconBroadcast,
    IconUserShare,
    IconClipboard,
} from "@tabler/icons-react";
import { SetStateAction, Dispatch, FC, useEffect, useState } from "react";
import useSocketStore from "@/store/socket";
import Avatar from "./Avatar";

type Props = {
    targetSocketId: string;
    setTargetSocketId: Dispatch<SetStateAction<string>>;
};

const ChatroomTitle: FC<Props> = ({ targetSocketId, setTargetSocketId }) => {
    const { socket, emitMode, setEmitMode, connect, disconnect } = useSocketStore(); // deconstructing socket and its method from socket store

    const [avatarPopoverOpen, setAvatarPopoverOpen] = useState(false); // control popover open/close
    const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>({}); // online users
    const [socketIdPopoverOpen, setSocketIdPopoverOpen] = useState(false);

    useEffect(() => {
        if (!socket) return;
        socket.on("online_user", (onlineUsers: Record<string, string>) => {
            setOnlineUsers(onlineUsers);
            console.log("online_user", onlineUsers);
        });
        return () => {
            socket.off("online_user");
        };
    }, [socket]);

    return (
        <>
            <Group position="apart" mt="xs" mb="xs" noWrap align="center" w={"100%"}>
                <Group noWrap>
                    <Avatar />
                    <Popover
                        width="fit-content"
                        position="bottom"
                        withArrow
                        shadow="md"
                        opened={avatarPopoverOpen}
                        onChange={setAvatarPopoverOpen}
                    >
                        <Popover.Target>
                            <ActionIcon
                                variant="subtle"
                                onClick={() => setAvatarPopoverOpen((open) => !open)}
                            >
                                <IconChevronDown size="1rem" />
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Group position="apart">
                                <Text size="sm">SocketID</Text>

                                {socket?.id ? (
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
                                ) : (
                                    <Loader size="1em" color="blue" />
                                )}
                            </Group>
                            <Group position="apart">
                                <Text size="sm">Actions</Text>
                                <Group className="gap-1">
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
                <Group noWrap>
                    <Popover
                        trapFocus
                        position="bottom"
                        offset={{
                            mainAxis: 5,
                            crossAxis: 30,
                        }}
                        shadow="md"
                        opened={socketIdPopoverOpen}
                        onChange={setSocketIdPopoverOpen}
                    >
                        <Popover.Target>
                            <SegmentedControl
                                size="xs"
                                value={emitMode}
                                onClick={() => {
                                    if (emitMode === "private_message") {
                                        setSocketIdPopoverOpen(true);
                                    }
                                }}
                                onChange={(value: "broadcast" | "private_message") => {
                                    setEmitMode(value);
                                    if (value === "broadcast") {
                                        setTargetSocketId("");
                                        setSocketIdPopoverOpen(false);
                                    } else {
                                        setSocketIdPopoverOpen(true);
                                    }
                                }}
                                data={[
                                    {
                                        value: "broadcast",
                                        label: (
                                            <Center>
                                                <IconBroadcast size="1rem" />
                                                <Box ml={10}>Broadcast</Box>
                                            </Center>
                                        ),
                                    },
                                    {
                                        value: "private_message",
                                        label: (
                                            <Center>
                                                <IconUserShare size="1rem" />
                                                <Box ml={10}>To</Box>
                                            </Center>
                                        ),
                                    },
                                ]}
                            />
                        </Popover.Target>
                        <Popover.Dropdown
                            sx={(theme) => ({
                                background:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[7]
                                        : theme.white,
                            })}
                        >
                            <TextInput
                                label="Socket id"
                                placeholder="Target Socket id"
                                size="xs"
                                value={targetSocketId}
                                onChange={(e) => setTargetSocketId(e.currentTarget.value)}
                                rightSection={
                                    <ActionIcon variant="subtle">
                                        <IconClipboard
                                            size="1rem"
                                            onClick={() => {
                                                navigator.clipboard.readText().then((text) => {
                                                    setTargetSocketId(text);
                                                });
                                            }}
                                        />
                                    </ActionIcon>
                                }
                            />
                        </Popover.Dropdown>
                    </Popover>
                    <Menu shadow="md">
                        <Menu.Target>
                            <ActionIcon variant="subtle">
                                <IconUserCog size="1.25em" />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Online user</Menu.Label>
                            {socket?.connected &&
                                Object.keys(onlineUsers)
                                    .filter((socketId) => socketId !== socket?.id)
                                    .map((socketId) => (
                                        <Menu.Item
                                            key={socketId}
                                            onClick={() => {
                                                setEmitMode("private_message");
                                                setSocketIdPopoverOpen(true);
                                                setTargetSocketId(socketId);
                                            }}
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
                                                    <MantineAvatar
                                                        src={null}
                                                        alt="User"
                                                        color="blue"
                                                        radius="xl"
                                                        w="fit-content"
                                                    >
                                                        <IconUser size="1.5rem" />
                                                    </MantineAvatar>
                                                </Indicator>
                                                <Text>{onlineUsers[socketId]}</Text>
                                            </Group>
                                        </Menu.Item>
                                    ))}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </>
    );
};

export default ChatroomTitle;
