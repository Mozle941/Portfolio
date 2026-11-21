const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://portfolio-omega-plum-40.vercel.app/";

export const siteUrl = `${new URL(configuredSiteUrl).origin}/`;
