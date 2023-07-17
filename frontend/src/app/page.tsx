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
        display: "flex",
        flexWrap: "nowrap",
       
        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
            fontSize: rem(28),
            lineHeight: 1.15,
        },
    },

    subtitle: {
        paddingTop: theme.spacing.xl,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 800,
        lineHeight: 1.05,
        fontSize: rem(40),

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
            fontSize: rem(18),
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
                        Based on{" "}
                        <Text
                            component="a"
                            td="underline"
                            href="https://nextjs.org/"
                            variant="gradient"
                            gradient={{ from: "yellow", to: "red", deg: 105 }}
                        >
                            Next.js13,{" "}
                        </Text>
                        <Text
                            component="a"
                            href="https://mantine.dev/"
                            variant="gradient"
                            gradient={{ from: "red", to: "purple", deg: 105 }}
                        >
                            Mantine,{" "}
                        </Text>
                        <Text
                            component="a"
                            href="https://socket.io/"
                            variant="gradient"
                            gradient={{ from: "purple", to: "blue", deg: 105 }}
                        >
                            Socket.io,{" "}
                        </Text>
                        <Text
                            component="a"
                            href="https://zustand-demo.pmnd.rs/"
                            variant="gradient"
                            gradient={{ from: "blue", to: "green", deg: 105 }}
                        >
                            Zustand.
                        </Text>
                    </Title>
                    <Text className={"opacity-75 max-w-full sm:max-w-[800px]"} mt={30}>
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
