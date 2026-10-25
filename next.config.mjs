/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  async redirects() {
    const to = (source, destination) => ({ source, destination, permanent: true });
    return [
      to('/programs', '/free-assessment'), to('/programs/:slug*', '/free-assessment'),
      to('/ar/programs', '/free-assessment'), to('/ar/programs/:slug*', '/free-assessment'),
      to('/services/skilled-visas', '/services/permanent-residence'), to('/services/business-immigration', '/services/residence-by-investment'),
      to('/services/family-visas', '/services/family-sponsorship'), to('/services/study-visas', '/services/student-visa'),
      to('/services/citizenship', '/services/citizenship-by-investment'), to('/services/visit-visas', '/services/global-tourist-visa'),
      to('/services/dependent-visa', '/services/family-sponsorship'), to('/services/business-visa', '/services'), to('/services/temporary-visa', '/services'),
      to('/visa/:service/:country', '/services/:service'), to('/ar/visa/:service/:country', '/services/:service'),
      to('/ar/services', '/services'), to('/ar/services/:slug', '/services/:slug'),
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
