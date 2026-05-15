export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  css: ["~/assets/main.css"],
  nitro: {
    preset: "static",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        process.env.CF_PAGES_URL ||
        "https://demo.mentorbase.fr",
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || "contact@mentorbase.fr",
    },
  },
});
