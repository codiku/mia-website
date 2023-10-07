import { UserSession } from "@/components/User/User";
export default async function Home() {
  return (
    <main className="">
      Home{" "}
      <div>
        <>
          <UserSession />
        </>
      </div>
    </main>
  );
}
