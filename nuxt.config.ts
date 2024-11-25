export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY,
      firebaseDomain: process.env.NUXT_FIREBASE_DOMAIN,
    },
  },
  modules: [
    "nuxt-quasar-ui",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  build: {
    transpile: ["trpc-nuxt", "@tanstack/vue-query"],
  },

  quasar: {
    plugins: ["Notify"],
    extras: {
      font: "roboto-font-latin-ext",
      fontIcons: ["material-icons"],
    },
    sassVariables: "assets/scss/quasar.variables.scss",
  },

  // Suppress Sass deprecation warnings
  vite: {
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          additionalData: '@use "sass:math"; @use "sass:color";',
        },
      },
    },
  },

  // pinia: {
  //   autoImports: ["defineStore", "acceptHMRUpdate"],
  // },
});
