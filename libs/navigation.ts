import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { LOCALES } from "@/i18n";

export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: LOCALES, localePrefix });
