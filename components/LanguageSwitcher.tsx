"use client";

import { LOCALES } from "@/i18n";
import { usePathname, useRouter } from "@/libs/navigation";
import { useLocale, useTranslations } from "next-intl";

import { readAllProduct } from "@/app/actions/product/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/configs/ky-config";
import { useEffect } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Components.LanguageSwitcher");

  useEffect(function dostuff() {
    (async () => {
      const data = await readAllProduct();
      console.log("Response", data);
      const resp = await api.get("/api/product").json();
      console.log("*** via api", resp);
    })();
  }, []);

  const handleChange = async (value: string) => {
    router.push(pathname, { locale: value });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select your language" />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
