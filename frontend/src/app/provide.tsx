"use client";
import { MantineProvider } from "@mantine/core";
import RootStyleRegistry from "./emotion";
import { useEffect } from "react";
import useSocketStore from "@/store/socket";

type Prop = {
    children: React.ReactNode;
};
export function AppProvider({ children }: Prop) {
    const [disconnect] = useSocketStore(({ disconnect }) => [disconnect]);

    useEffect(() => {
        return () => {
            console.log("disconnect");
            disconnect();
        };
    }, []);

    return (
        <RootStyleRegistry>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                {children}
            </MantineProvider>
        </RootStyleRegistry>
    );
}
