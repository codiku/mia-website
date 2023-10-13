"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

/* Only use to auto login after clicking on verification email in mail box */
export function SigninInRedirectionProvider(p: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const session = useSession();
  const router = useRouter();
  const [isRedirectionDone, setIsRedirectionDone] = useState(false);
  useEffect(() => {
    if (token && session.status != "authenticated") {
      (async () => {
        const signinResp = await signIn("credentials", {
          email: null,
          password: null,
          token: token,
          redirect: false,
        });
        if (signinResp?.error) {
          toast.error("Signin failed");
        } else {
          router.replace("/");
          toast.success("You are know signed in");
        }
        setIsRedirectionDone(true);
      })();
    } else {
      setIsRedirectionDone(true);
    }
  }, [token]);
  return <>{isRedirectionDone && p.children}</>;
}
