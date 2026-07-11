import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_ky1bRBtD2OdA@ep-jolly-snow-ad1yq7ma-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
