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
  // env: {
  //   AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  //   AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  //   AWS_S3_NAME: process.env.AWS_S3_NAME,
  //   AWS_REGION: process.env.AWS_REGION
  // }
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
