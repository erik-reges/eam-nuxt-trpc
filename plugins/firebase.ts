import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseDomain,
  };

  const firebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

  const auth = getAuth(firebaseApp);

  return {
    provide: {
      firebase: firebaseApp,
      auth: auth,
    },
  };
});
