import fs from "fs";

async function main() {
  const jobs = JSON.parse(
    fs.readFileSync("data/imports/jobs.json", "utf8")
  );

  const response = await fetch(
    "https://kampus.kandktechsolutions.co.za/api/admin/import-opportunities",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobs),
    }
  );

  const result = await response.json();

  console.log(result);
}

main().catch(console.error);