"use client";
import { Container, Title, createStyles, rem } from "@mantine/core";
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
                    <Title className={classes.subtitle}>Based on Next.js 13, Socket.io.</Title>

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
