"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function ButtonSignout() {
  return (
    <Button
      onClick={() =>
        signOut({
          //redirect: true,
          // callbackUrl: window.location.origin + "/auth/signin",
        })
      }
      variant={"destructive"}
    >
      Logout
    </Button>
  );
}
