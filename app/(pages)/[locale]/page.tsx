import { UrlTokenAutoSignin } from "@/components/providers/UrlTokenAutoSignin";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
export default async function Home(p: { params: { lng: string } }) {
  const serverSession = await getServerSession();
  const t = await getTranslations("Index");
  return (
    <UrlTokenAutoSignin>
      <main className="">
        <h1 className="text-4xl">{t("title")}</h1>
        {serverSession?.user?.email ? (
          <>
            <div>Hello {serverSession.user.email}</div>
            <Link href="/auth/account">{t("linkAccount")}</Link>
          </>
        ) : (
          <div>
            <Link href="/auth/signin">{t("linkSignin")}</Link>
          </div>
        )}
      </main>
    </UrlTokenAutoSignin>
  );
}
