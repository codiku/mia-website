import { UserSession } from "@/components/UserSession/User";
import { getServerSession } from "next-auth";

export default async function Home() {
  const d = await getServerSession();
  return (
    <main className="">
      <div>User server side : {JSON.stringify(d?.user)}</div>
      <div>
        User client side <UserSession />
      </div>
    </main>
  );
}
