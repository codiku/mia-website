/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")("./i18n/index.ts");

module.exports = withNextIntl({
  reactStrictMode: false,
  output: "export",
});
