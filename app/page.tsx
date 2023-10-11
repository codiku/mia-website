import { SigninProvider } from "@/providers/SigninInProvider";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const serverSession = await getServerSession();
  return (
    <SigninProvider>
      <main className="">
        <h1 className="text-4xl">Index</h1>
        {serverSession?.user?.email ? (
          <>
            <div>Hello {serverSession.user.email}</div>
            <Link href="/auth/profil">Profil</Link>
          </>
        ) : (
          <div>
            <Link href="/auth/signin">Signin</Link>
          </div>
        )}
      </main>
    </SigninProvider>
  );
}
