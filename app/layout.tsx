import "./configs/axios-config";
import { SessionProvider } from "@/providers/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "App",
  description: "Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${inter.className} p-16 h-screen`}>
          <Toaster richColors position="top-right" />
          <>{children}</>
        </body>
      </SessionProvider>
    </html>
  );
}
