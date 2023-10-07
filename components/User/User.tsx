"use client";

import { ButtonSignout } from "@/app/auth/signin/components/ButtonSignout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserSession(p: {}) {
  const session = useSession();
  return (
    <>
      User :
      {session.status === "authenticated" ? (
        <>
          {JSON.stringify(session)}
          <ButtonSignout />
        </>
      ) : (
        <Link href="/auth/signin">Not connected please signin</Link>
      )}
    </>
  );
}
