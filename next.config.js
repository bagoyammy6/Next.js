/** @type {import('next').NextConfig} */
const nextConfig = {};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate(nextConfig);
