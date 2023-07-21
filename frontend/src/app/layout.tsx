import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "./provide";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

type Prop = {
    children: React.ReactNode;
};

export const metadata = {
    title: "A Simple Full-Stack Socket.io Demo",
    description: "This repo implements a simple chat app with Socket.io, Next.js 13, Mantine and Zustand.",
};

export default function RootLayout({ children }: Prop) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppProvider>{children}</AppProvider>
                <Toaster position="top-center" reverseOrder={false} />
            </body>
        </html>
    );
}
