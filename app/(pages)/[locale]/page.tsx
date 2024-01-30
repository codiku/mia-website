import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UrlTokenAutoSignin } from "@/components/providers/UrlTokenAutoSignin";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { SVGProps } from "react";

export default async function HomePage(p: { params: { lng: string } }) {
  const serverSession = await getServerSession();
  const t = await getTranslations("Index");
  return (
    <UrlTokenAutoSignin>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link
            className="flex items-center justify-center no-underline"
            href="#"
          >
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <LanguageSwitcher />
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Next Boiler Plate
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    🚀 Elevate your web development with pre-configured
                    Typescript, Prisma, Next Auth (email, password and google),
                    Tailwind, Shadcnui, Next-intl, Storybook, Playwright,
                    Swagger, Crud generator and much more...
                  </p>
                </div>
                <div>
                  {serverSession?.user?.email ? (
                    <>
                      <div>Hello {serverSession.user.email}</div>
                      <Link
                        className="no-underline inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        href="/auth/account"
                      >
                        {t("linkAccount")}
                      </Link>
                    </>
                  ) : (
                    <div className="space-x-4">
                      <Link
                        className="no-underline inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        href="/auth/signin"
                      >
                        {t("linkSignin")}
                      </Link>
                      <Link
                        className="no-underline inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                        href="/auth/signup"
                      >
                        {t("linkSignup")}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </UrlTokenAutoSignin>
  );
}

function MountainIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...p}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
