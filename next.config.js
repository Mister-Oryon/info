/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['three'])
module.exports = {
  reactStrictMode: true,
}

module.exports = withTM()
