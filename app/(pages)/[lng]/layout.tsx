import "@/configs/axios-config";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { dir } from "i18next";
import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "App",
  description: "Application",
};

export default function RootLayout(p: {
  children: ReactNode;
  params: { lng: string };
}) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <html lang={p.params.lng} dir={dir(p.params.lng)}>
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
