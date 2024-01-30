import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "App",
  description: "Application",
};

export default function RootLayout(p: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <html>
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
