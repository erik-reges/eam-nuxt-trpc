import type { createTRPCVueQueryClient } from "@falcondev-oss/trpc-vue-query";
import type { AppRouter } from "~/packages/trpc/routers/hello";

export function useTRPC() {
  return useNuxtApp().$trpc as ReturnType<
    typeof createTRPCVueQueryClient<AppRouter>
  >;
}
