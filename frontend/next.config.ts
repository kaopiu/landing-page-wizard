import type { NextConfig } from "next";

// GitHub Pages serves a project repo at https://<user>.github.io/<repo>/,
// so the built site needs that repo name as its base path. The deploy
// workflow sets NEXT_BASE_PATH at build time; locally (npm run dev/build)
// it's unset and the app behaves as a normal root-served site.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
