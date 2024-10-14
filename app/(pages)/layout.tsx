import "../theme/index.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mia",
  description: "AI desktop chat assistant",
};

export default function RootLayout(p: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <ReactQueryProvider>
      <html lang={p.params.locale}>
        <body className={`${inter.className} `}>
          <div className="h-screen p-4">
            <Toaster richColors position="top-right" />
            {p.children}
          </div>
          <ReactQueryDevtools />
        </body>
      </html>
    </ReactQueryProvider>
  );
}