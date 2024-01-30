import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function AuthLayout(p: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages() as IntlMessages;

  return (
    <NextIntlClientProvider messages={messages}>
      {p.children}
    </NextIntlClientProvider>
  );
}
