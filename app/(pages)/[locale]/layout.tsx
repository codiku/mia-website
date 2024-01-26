import "@/configs/axios-config";
import "./globals.css";
import { SessionProvider } from "@/providers/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "App",
  description: "Application",
};

export default function RootLayout(p: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <html lang={p.params.locale}>
          <body className={`${inter.className} p-16 h-screen`}>
            <Toaster richColors position="top-right" />
            {p.children}
            <ReactQueryDevtools />
          </body>
        </html>
      </SessionProvider>
    </ReactQueryProvider>
  );
}
