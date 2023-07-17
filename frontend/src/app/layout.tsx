import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "./provide";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

type Prop = {
    children: React.ReactNode;
};

export const metadata = {
    title: "Tiny Socket.io demo",
    description: "This repo implements a simple chat app with Socket.io and Next.js 13.",
};

export default function RootLayout({ children }: Prop) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppProvider>{children}</AppProvider>
                <Toaster position="bottom-right" reverseOrder={false} />
            </body>
        </html>
    );
}
