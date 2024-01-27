"use client";

import { LOCALES } from "@/i18n";
import { usePathname, useRouter } from "@/utils/navigation";
import { useLocale } from "next-intl";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export  function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Components.LanguageSwitcher");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <Select value={locale} onChange={handleChange}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select your language" />
    </SelectTrigger>
     <SelectContent>
      {LOCALES.map((locale) => (
        <SelectItem key={locale} value={locale}>{locale}</SelectItem>
      ))}
       </SelectContent>
    </Select>
  );
}
