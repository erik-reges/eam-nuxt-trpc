import { createTRPCVueQueryClient } from "@falcondev-oss/trpc-vue-query";
import { httpBatchLink } from "trpc-nuxt/client";
import type { AppRouter } from "~/packages/trpc/routers/hello";
import type { QueryClient } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const { $queryClient } = nuxtApp;

  const queryClient = $queryClient as QueryClient;

  const trpc = createTRPCVueQueryClient<AppRouter>({
    queryClient,
    trpc: {
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    },
  });

  return {
    provide: {
      trpc,
    },
  };
});
