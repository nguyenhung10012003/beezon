import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/hooks/auth-context";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Beezon",
  description: "Beezon - The best place to buy and sell things",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className}`} suppressHydrationWarning>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer/>
    </body>
    </html>
  );
}
