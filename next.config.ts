import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents : true,
  images: {
    domains: ["assets.basehub.com"],
	remotePatterns: [
		{
			protocol: "https",
			hostname: "assets.basehub.com",
		},
		{
			hostname: "wary-husky-328.convex.cloud",
			protocol: "https",
			port: "",
		}
	]
  },	

};

export default nextConfig;
