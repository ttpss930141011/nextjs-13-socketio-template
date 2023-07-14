import { TextInput, Button, Modal, Text } from "@mantine/core";
import { FC } from "react";
import { useForm } from "@mantine/form";
import useBasicStore from "@/store/basic";

type Props = {
    opened: boolean;
    onClose: () => void;
};
const NameModal: FC<Props> = ({ opened, onClose }) => {
    const [name, setName] = useBasicStore((state) => [state.name, state.setName]);

    const form = useForm({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => (value.trim().length < 1 ? "Name is required" : null),
        },
    });
    const handleSubmit = ({ name }: { name: string }) => {
        console.log(name);
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
                    Your current name is{" "}
                    <span style={{ fontWeight: "bold", backgroundColor: "#fcc419" }}>{name}</span>
                </Text>
            </form>
        </Modal>
    );
};

export default NameModal;
