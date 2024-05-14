/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.gravatar.com',
          port: '',
          pathname: '/avatar/**',
        },
      ],
    },
   
  };