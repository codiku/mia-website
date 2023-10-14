const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

async function generateCRUDFiles(endpoint: string) {
  const apiDirectory = path.join(process.cwd(), "app/api", endpoint);
  const idApiDirectory = path.join(apiDirectory, "[id]");

  try {
    // Create the main endpoint directory
    await fs.mkdir(apiDirectory, { recursive: true });

    // Create the [id] directory
    await fs.mkdir(idApiDirectory, { recursive: true });

    // Generate empty route.ts files for the main endpoint and [id] directory
    await fs.writeFile(path.join(apiDirectory, "route.ts"), "");
    await fs.writeFile(path.join(idApiDirectory, "route.ts"), "");

    console.log(
      `CRUD files and folders for '${endpoint}' created successfully.`
    );
  } catch (err) {
    console.error(
      `Error creating CRUD files and folders: ${(err as Error).message}`
    );
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the name of the endpoint: ", async (endpoint: string) => {
    rl.close();
    if (endpoint) {
      await generateCRUDFiles(endpoint);
    } else {
      console.log("Endpoint name cannot be empty.");
    }
  });
}

main();
