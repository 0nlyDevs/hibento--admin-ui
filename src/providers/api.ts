import { createClient } from "@hey-api/client-fetch";
import { AdminSdk } from "../lib/admin-client";
import { PublicSdk } from "../lib/client";
import { userManager } from "./authProvider";

const adminClient = createClient({
  baseUrl: import.meta.env.VITE_ADMIN_API_URL,
});

adminClient.interceptors.request.use(async (request) => {
  try {
    const user = await userManager.getUser();
    if (user?.access_token) {
      request.headers.set("Authorization", `Bearer ${user.access_token}`);
    }
  } catch {
    // not authenticated — no token to add
  }
  return request;
});

const publicClient = createClient({
  baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
});

export const adminApi = new AdminSdk({ client: adminClient });
export const publicApi = new PublicSdk({ client: publicClient });
