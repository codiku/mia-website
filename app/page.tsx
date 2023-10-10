import { UserSession } from "@/components/UserSession/User";
import { SigninProvider } from "@/providers/SigninInProvider";
import { getServerSession } from "next-auth";

export default async function Home() {
  const serverSession = await getServerSession();
  return (
    <SigninProvider>
      Server session : {serverSession?.user?.email}
      <main className="">
        <UserSession />
      </main>
    </SigninProvider>
  );
}
