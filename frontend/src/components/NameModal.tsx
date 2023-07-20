import { TextInput, Button, Modal, Text } from "@mantine/core";
import { FC } from "react";
import { useForm } from "@mantine/form";
import useBasicStore from "@/store/basic";
import useSocketStore from "@/store/socket";
import { useEffect } from "react";
import { SocketOnlineUser } from "@/types/next";
type NameModalProps = {
    opened: boolean;
    onClose: () => void;
};

const NameModal: FC<NameModalProps> = ({ opened, onClose }) => {
    const [name, setName] = useBasicStore((state) => [state.name, state.setName]);
    const { socket, emit } = useSocketStore((state) => state);

    const form = useForm({
        initialValues: { name },
        validate: {
            name: (value) => (value.trim().length < 1 ? "Name is required" : null),
        },
    });

    useEffect(() => {
        if (!socket) return;
        emit("join", { socketId: socket.id, name: name });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket?.id, name]);

    // Function to handle form submission
    const handleSubmit = ({ name }: { name: string }) => {
        setName(name);
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title="New Name">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Your name"
                    placeholder="Your name"
                    data-autofocus
                    {...form.getInputProps("name")}
                />
                <Button type="submit" fullWidth mt="md">
                    Submit
                </Button>
                <Text size="xs" mt={5}>
                    Your current name is <span className="current-name">{name}</span>
                </Text>
            </form>
        </Modal>
    );
};

export default NameModal;
