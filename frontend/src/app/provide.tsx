"use client";
import { MantineProvider } from "@mantine/core";
import RootStyleRegistry from "./emotion";
import { useEffect } from "react";
import useSocketStore from "@/store/socket";

type Prop = {
    children: React.ReactNode;
};
export function AppProvider({ children }: Prop) {
    const disconnect = useSocketStore((state) => state.disconnect);

    useEffect(() => {
        window.addEventListener("beforeunload", disconnect);
        return () => {
            window.removeEventListener("beforeunload", disconnect);
            disconnect();
        };
    }, [disconnect]);

    return (
        <RootStyleRegistry>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                {children}
            </MantineProvider>
        </RootStyleRegistry>
    );
}
