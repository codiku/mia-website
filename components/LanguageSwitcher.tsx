"use client";

import { LOCALES } from "@/i18n";
import { usePathname, useRouter } from "@/utils/navigation";
import { useLocale } from "next-intl";
import { ChangeEvent } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <select value={locale} onChange={handleChange}>
      {LOCALES.map((locale) => (
        <option value={locale}>{locale}</option>
      ))}
    </select>
  );
}
