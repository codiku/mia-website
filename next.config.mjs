/** @type {import('next').NextConfig} */

import withNextIntl from "next-intl/plugin";

const nextConfig = withNextIntl("./i18n/index.ts")({
  reactStrictMode: false,
});

export default nextConfig;
