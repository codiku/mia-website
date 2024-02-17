/** @type {import('next').NextConfig} */
import million from "million/compiler";
const millionConfig = {
  auto: { rsc: true }, // if you're using RSC: auto: { rsc: true },
};
import withNextIntl from "next-intl/plugin";

const nextConfig = withNextIntl("./i18n/index.ts")({
  reactStrictMode: false,
});

export default million.next(nextConfig, millionConfig);
