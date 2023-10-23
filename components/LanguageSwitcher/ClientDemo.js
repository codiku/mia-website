"use client";
import { useTranslation } from "../../app/i18n/client";

export function ClientDemo() {
  const { t } = useTranslation();
  return <>Client : {t("title")}</>;
}
