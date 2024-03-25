/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'dicelogger-images.s3.sa-east-1.amazonaws.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// }

export default nextConfig;
