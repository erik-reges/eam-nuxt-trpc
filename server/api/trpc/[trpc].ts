import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter } from "~/packages/trpc/routers/hello";
import { createContext } from "~/packages/trpc/context";
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
