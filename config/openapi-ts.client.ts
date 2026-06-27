import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./docs/client-spec.yaml",
  output: "./src/lib/client",
  plugins: [
    {
      name: "@hey-api/sdk",
      operations: {
        strategy: "single",
        containerName: "PublicSdk",
      },
    },
  ],
});
