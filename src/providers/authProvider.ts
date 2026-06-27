import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import type { AuthProvider } from "react-admin";

const userManager = new UserManager({
  authority: import.meta.env.VITE_CASDOOR_SERVER_URL,
  client_id: import.meta.env.VITE_CASDOOR_CLIENT_ID,
  redirect_uri: `${window.location.origin}/callback`,
  scope: "openid profile email",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 60,
});

export { userManager };

export const authProvider: AuthProvider = {
  login: async () => {
    await userManager.signinRedirect();
  },

  logout: async () => {
    await userManager.removeUser();
    return Promise.resolve();
  },

  checkAuth: async () => {
    const user = await userManager.getUser();
    if (user && !user.expired) {
      return Promise.resolve();
    }
    // No valid token → redirect to Casdoor
    await userManager.signinRedirect();
    return Promise.reject();
  },

  checkError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      // Token expired/invalid → redirect to Casdoor
      await userManager.removeUser();
      await userManager.signinRedirect();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const user = await userManager.getUser();
    if (!user?.profile) throw new Error("Not authenticated");
    return {
      id: user.profile.sub!,
      fullName: user.profile.name || user.profile.preferred_username || "",
      email: user.profile.email!,
      avatar: user.profile.picture,
    };
  },

  getPermissions: () => Promise.resolve([]),
};
