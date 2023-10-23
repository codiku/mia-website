import { UrlTokenAutoSignin } from "@/components/providers/UrlTokenAutoSignin";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useServerTranslation } from "@/i18n/server";
export default async function Home(p: { params: { lng: string } }) {
  const serverSession = await getServerSession();
  const { t } = await useServerTranslation(p.params.lng);

  return (
    <UrlTokenAutoSignin>
      <main className="">
        <h1 className="text-4xl">{t("title")}</h1>
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
