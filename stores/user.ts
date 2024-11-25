// usage
// const userStore = useUserStore();

// // SSO Login
// try {
//   await userStore.loginSSO("reges");
// } catch (error) {
//   // Handle error
// }

// // Email/Password Login
// try {
//   await userStore.loginWithEmailPassword("user@example.com", "password");
// } catch (error) {
//   // Handle error
// }

// // Logout
// await userStore.logout();

// // Check permissions
// const hasAccess = userStore.hasAccess(["some-permission"]);

import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  SAMLAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const TRAIND_OWNER_KEY = "TRAIND_OWNER_KEY";
const TRAIND_TOKEN_KEY = "TRAIND_ACCESS_TOKEN";

type Owner =
  | "reges"
  | "vr"
  | "transdev"
  | "sj"
  | "mtrx"
  | "skanetrafiken"
  | "snalltaget"
  | "tagibergslagen"
  | "dsb"
  | "goahead";

interface OwnerConfig {
  owner: Owner;
  displayName: string;
  active: boolean;
  samlProvider?: string;
  tenantId?: string;
  logoUrl?: string;
}

export const ownerConfig: Record<Owner, OwnerConfig> = {
  reges: {
    owner: "reges",
    displayName: "Reges",
    active: true,
    samlProvider: "saml.reges-apps",
    tenantId: "reges-xu7p4",
    logoUrl: "/logos/logo_reges.svg",
  },
  vr: {
    owner: "vr",
    displayName: "VR",
    active: false,
    samlProvider: "saml.vr-traind",
    tenantId: "vr-sverige-fjx38",
    logoUrl: "/logos/logo_vr.svg",
  },
  transdev: {
    owner: "transdev",
    displayName: "Transdev",
    active: false,
    samlProvider: "saml.transdev-traind",
    tenantId: "transdev-sverige-amz71",
    logoUrl: "/logos/logo_transdev.svg",
  },
  sj: {
    owner: "sj",
    displayName: "SJ",
    active: false,
    samlProvider: "aml.sj-traind",
    tenantId: "sj-ab-4f78o",
    logoUrl: "/logos/logo_sj.svg",
  },
  mtrx: {
    owner: "mtrx",
    displayName: "MTRX",
    active: false,
    logoUrl: "/logos/logo_mtrx.svg",
  },
  skanetrafiken: {
    owner: "skanetrafiken",
    displayName: "Skånetrafiken",
    active: false,
    logoUrl: "/logos/logo_skanetrafiken.svg",
  },
  snalltaget: {
    owner: "snalltaget",
    displayName: "Snälltågen",
    active: false,
    logoUrl: "/logos/logo_snalltaget.svg",
  },
  tagibergslagen: {
    owner: "tagibergslagen",
    displayName: "Tåg i Berslagen",
    active: false,
    logoUrl: "/logos/logo_tagibergslagen.svg",
  },
  dsb: {
    owner: "dsb",
    displayName: "DSB",
    active: false,
    logoUrl: "/logos/logo_dsb.svg",
  },
  goahead: {
    owner: "goahead",
    displayName: "Go-Ahead",
    active: false,
    logoUrl: "/logos/logo_goahead.svg",
  },
};

// helpers
const setOwner = (owner: Owner) => {
  window.localStorage.setItem(TRAIND_OWNER_KEY, owner);
};

const setToken = (token: string) => {
  window.localStorage.setItem(TRAIND_TOKEN_KEY, token);
};
export const useUserStore = defineStore("user", {
  state: () => ({
    isPopupBlocked: false,
    showSelectAccounts: false,
    email: null as string | null,
    permissions: [] as string[],
  }),

  getters: {
    owners: (state) => {
      return Object.values(ownerConfig).sort((a, b) =>
        a.displayName.localeCompare(b.displayName),
      );
    },
  },

  actions: {
    async loginSSO(owner: Owner) {
      const { $auth } = useNuxtApp();

      try {
        setOwner(owner);
        this.isPopupBlocked = false;

        const samlProvider = ownerConfig[owner].samlProvider;
        const tenantId = ownerConfig[owner].tenantId;

        if (!samlProvider) {
          throw `Owner: ${owner} doesn't have any samlProvider configured`;
        }

        if (!tenantId) {
          throw `Owner: ${owner} doesn't have any tenant configured`;
        }

        const provider = new SAMLAuthProvider(samlProvider);
        $auth.tenantId = tenantId;

        const { user } = await signInWithPopup($auth, provider);
        const token = await user.getIdToken();
        setToken(token);
        this.email = user.email;

        return true;
      } catch (error: any) {
        if (error?.code === "auth/popup-blocked") {
          this.isPopupBlocked = true;
        }
        console.error("Login error:", error);
        throw error;
      }
    },

    async loginWithEmailPassword(
      email: string,
      password: string,
      owner: Owner = "reges",
    ) {
      const { $auth } = useNuxtApp();

      try {
        setOwner(owner);
        const tenantId = ownerConfig[owner].tenantId;

        if (tenantId) {
          $auth.tenantId = tenantId;
        }

        const { user } = await signInWithEmailAndPassword(
          $auth,
          email,
          password,
        );
        const token = await user.getIdToken();
        setToken(token);
        this.email = user.email;

        return true;
      } catch (error) {
        console.error("Email/Password login error:", error);
        throw error;
      }
    },

    async logout() {
      const { $auth } = useNuxtApp();

      try {
        await signOut($auth);
        this.email = null;
        this.permissions = [];
        window.localStorage.removeItem(TRAIND_OWNER_KEY);
        window.localStorage.removeItem(TRAIND_TOKEN_KEY);
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    },

    hasAccess(requiredPermissions?: string[]) {
      if (!requiredPermissions || !requiredPermissions.length) return true;
      return requiredPermissions.every((permission) =>
        this.permissions.includes(permission),
      );
    },
  },
});
