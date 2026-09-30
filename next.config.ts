import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets other tailnet machines load dev assets and hot reload.
  allowedDevOrigins: ["dell-server.tail33e7ae.ts.net", "100.65.145.58"],
};

export default nextConfig;
