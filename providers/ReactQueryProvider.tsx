"use client";
import { queryClient } from "@/app/configs/react-query-config";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function ReactQueryProvider(p: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  );
}
