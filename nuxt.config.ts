// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui"],
  build: {
    transpile: ["trpc-nuxt", "@tanstack/vue-query"],
  },
  quasar: {
    plugins: ["Notify"], // Add any Quasar plugins you need
    extras: {
      font: "roboto-font",
      fontIcons: ["material-icons"],
    },
  },
});
