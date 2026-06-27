import type { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  login: () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/casdoor";
    return Promise.resolve();
  },

  logout: () => {
    window.location.href = "http://localhost:8080/logout";
    return Promise.resolve();
  },

  checkAuth: () => Promise.resolve(),

  checkError: () => Promise.resolve(),

  getIdentity: () => Promise.resolve({ id: "1", fullName: "Admin" }),

  getPermissions: () => Promise.resolve([]),
};
