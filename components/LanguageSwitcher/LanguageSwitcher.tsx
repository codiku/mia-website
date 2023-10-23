import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/i18n/settings";
import { useServerTranslation } from "@/i18n/server";

export const LanguageSwitcher = async (p: { lng: string }) => {
  const { t } = await useServerTranslation(p.lng);
  return (
    <>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{p.lng}</strong> to:{" "}
      </Trans>
      {languages
        .filter((l) => p.lng !== l)
        .map((l, index: number) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </>
  );
};
