import { UrlTokenAutoSignin } from "../providers/UrlTokenAutoSignin";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const serverSession = await getServerSession();
  return (
    <UrlTokenAutoSignin>
      <main className="">
        <h1 className="text-4xl">Index</h1>
        {serverSession?.user?.email ? (
          <>
            <div>Hello {serverSession.user.email}</div>
            <Link href="/auth/account">Account</Link>
          </>
        ) : (
          <div>
            <Link href="/auth/signin">Signin</Link>
          </div>
        )}
      </main>
    </UrlTokenAutoSignin>
  );
}
