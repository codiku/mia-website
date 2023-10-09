import { UserSession } from "@/components/UserSession/User";
import { SigninProvider } from "@/providers/SigninInProvider";

export default async function Home() {
  return (
    <SigninProvider>
      <main className="">
        <UserSession />
      </main>
    </SigninProvider>
  );
}
