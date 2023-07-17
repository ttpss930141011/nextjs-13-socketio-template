"use client";
import { Container, Title, createStyles, rem, Text, Code, Mark } from "@mantine/core";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme) => ({
    inner: {
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",

        [theme.fn.smallerThan("md")]: {
            marginRight: 0,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        fontSize: rem(64),

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            fontSize: rem(34),
            lineHeight: 1.15,
        },
    },

    subtitle: {
        paddingTop: theme.spacing.xl,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 800,
        lineHeight: 1.05,
        fontSize: rem(40),

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            fontSize: rem(26),
            lineHeight: 1.15,
        },
    },
}));
export default function Home() {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <>
            <Container pt="sm" size="lg">
                <div className={classes.inner}>
                    <Title
                        variant="gradient"
                        gradient={{ from: "indigo", to: "cyan" }}
                        className={classes.title}
                    >
                        Tiny Socket.io demo
                    </Title>
                    <Title className={classes.subtitle}>
                        Based on <a href="https://nextjs.org/">Next.js13</a>,
                        <a href="https://mantine.dev/">Mantine</a>,
                        <a href="https://socket.io/">Socket.io</a>,
                        <a href="https://zustand-demo.pmnd.rs/">Zustand</a>.
                    </Title>
                    <Text className={"opacity-75 max-w-full sm:max-w-[700px]"} mt={30}>
                        This repo implements a simple chat app with Socket.io and Next.js 13.
                        <br />
                        You can use <Code>npm run dev</Code> to access
                        <Mark> Next.js mock socket.io server </Mark>
                        to test the app locally.
                        <br />
                        Or use <Code>npm run prod</Code> to access the
                        <Mark> express server </Mark>
                        in the backend folder to test like the production scenario.
                    </Text>
                    <Button
                        mt={30}
                        size="lg"
                        variant="gradient"
                        gradient={{ from: "teal", to: "lime", deg: 105 }}
                        onClick={() => {
                            router.push("/home");
                        }}
                    >
                        Get Started
                    </Button>
                </div>
            </Container>
        </>
    );
}
