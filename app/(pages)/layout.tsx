import "@/configs/axios-config";
import { SessionProvider } from "@/providers/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "App",
  description: "Application",
};

export default function RootLayout(p: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-16 h-screen`}>
        <ReactQueryProvider>
          <SessionProvider>
            <Toaster richColors position="top-right" />
            {p.children}
            <ReactQueryDevtools />
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
