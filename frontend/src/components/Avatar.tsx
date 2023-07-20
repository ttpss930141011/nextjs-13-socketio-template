import { createStyles, Indicator, Overlay, Avatar as MantineAvatar } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import NameModal from "./NameModal";
import useBasicStore from "@/store/basic";
import { useDisclosure } from "@mantine/hooks";
import useSocketStore from "@/store/socket";

const useStyles = createStyles((theme, { isShown }: { isShown: boolean }) => ({
    overlay: {
        cursor: "pointer",
        opacity: !isShown ? "0" : "1",
        transition: "all .2s",
        visibility: !isShown ? "hidden" : "visible",
    },
}));

const Avatar = () => {
    const socket = useSocketStore((state) => state.socket); // deconstructing socket and its method from socket store
    const storeName = useBasicStore((state) => state.name); // get name from basic store
    const [name, setName] = useState<string | null>(null); // avoiding Next.js hydration error
    const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure(false); // control change name modal open/close
    const [isShown, setIsShown] = useState(false);
    const { classes } = useStyles({ isShown });

    useEffect(() => {
        setName(storeName);
        if (!storeName) modalOpen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeName]);

    return (
        <>
            <Indicator
                inline
                size={16}
                offset={5}
                position="bottom-end"
                color={socket?.connected ? "teal" : "red"}
                withBorder
                zIndex={2}
            >
                <MantineAvatar
                    src={null}
                    alt="User"
                    color="blue"
                    radius="xl"
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                >
                    {name && name.length > 5 ? `${name.slice(0, 1)}` : name}
                    <Overlay
                        blur={15}
                        center
                        radius="xl"
                        zIndex={1}
                        className={classes.overlay}
                        onClick={modalOpen}
                    >
                        <IconPencil size="1.5rem" />
                    </Overlay>
                </MantineAvatar>
            </Indicator>
            <NameModal opened={modalOpened} onClose={modalClose} />
        </>
    );
};

export default Avatar;
