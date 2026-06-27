import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./docs/admin-spec.yaml",
  output: "./src/lib/admin-client",
  plugins: [
    {
      name: "@hey-api/sdk",
      operations: {
        strategy: "single",
        containerName: "AdminSdk",
      },
    },
  ],
});
