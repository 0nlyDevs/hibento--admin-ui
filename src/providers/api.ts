import { createClient } from "@hey-api/client-fetch";
import { AdminSdk } from "../lib/admin-client";
import { PublicSdk } from "../lib/client";

const adminClient = createClient({
  baseUrl: import.meta.env.VITE_ADMIN_API_URL,
  credentials: "include",
});

const publicClient = createClient({
  baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
  credentials: "include",
});

export const adminApi = new AdminSdk({ client: adminClient });
export const publicApi = new PublicSdk({ client: publicClient });
