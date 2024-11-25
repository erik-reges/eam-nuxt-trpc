import {
  VueQueryPlugin,
  QueryClient,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
  });

  const options: VueQueryPluginOptions = { queryClient };

  nuxtApp.vueApp.use(VueQueryPlugin, options);

  return {
    provide: {
      queryClient,
    },
  };
});
