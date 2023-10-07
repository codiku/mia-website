"use client";
import { SessionProvider as NAuthSessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
export const SessionProvider: FC<{ children: ReactNode }> = (p) => {
  return <NAuthSessionProvider>{p.children}</NAuthSessionProvider>;
};
