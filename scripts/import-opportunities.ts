import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });

async function main() {
  console.log("1. Environment loaded");

  const { db } = await import("../src/db");
  console.log("2. Database module imported");

  const { opportunities } = await import("../src/db/schema");
  console.log("3. Schema imported");

  const jobs = JSON.parse(
    fs.readFileSync("data/imports/jobs.json", "utf8")
  );
  console.log(`4. Loaded ${jobs.length} jobs`);

  console.log("5. Testing database connection...");
  await db.execute("SELECT 1");
  console.log("6. Database connection OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});