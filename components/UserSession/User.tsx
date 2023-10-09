"use client";

import { ButtonSignout } from "@/app/auth/signin/components/ButtonSignout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserSession() {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        <>
          {JSON.stringify(session)}
          <div>
            <ButtonSignout />
          </div>
        </>
      ) : (
        <span>
          Not connected please{" "}
          <Link href="/auth/signin" className="underline">
            signin
          </Link>
        </span>
      )}
    </>
  );
}
