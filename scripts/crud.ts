const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");
const { exec, ExecException } = require("child_process");
const {
  importSkull,
  postSkull,
  getSkull,
  getAllSkull,
  patchSkull,
  deleteSkull,
  pageLevel1ImportsSkull,
  pageLevel2ImportsSkull,
  schemaActionSkull,
  actionSkull,
  apiSchemaSkull,
  docSkull,
} = require("./crud-skull");

async function generateCRUDFiles(endpoint: string) {
  const apiDirectory = path.join(process.cwd(), "app/api", endpoint);
  const idApiDirectory = path.join(apiDirectory, "[id]");
  const actionDirectory = path.join(process.cwd(), "app/actions", endpoint);
  try {
    // Create directories concurrently
    await Promise.all([
      fs.mkdir(apiDirectory, { recursive: true }),
      fs.mkdir(actionDirectory, { recursive: true }),
      fs.mkdir(idApiDirectory, { recursive: true }),
    ]);
    const pascalCaseEndpoint = toPascalCase(endpoint);
    const camelCaseEndpoint = toCamelCase(endpoint);
    // Generate route.ts files for the main endpoint and [id] directory
    fs.writeFile(
      path.join(apiDirectory, "route.ts"),
      pageLevel1ImportsSkull(camelCaseEndpoint, pascalCaseEndpoint) +
        "\n\n" +
        getAllSkull(camelCaseEndpoint, pascalCaseEndpoint) +
        "\n" +
        postSkull(camelCaseEndpoint, pascalCaseEndpoint)
    );

    fs.writeFile(
      path.join(idApiDirectory, "route.ts"),

      pageLevel2ImportsSkull(camelCaseEndpoint, pascalCaseEndpoint) +
        "\n" +
        getSkull(camelCaseEndpoint, pascalCaseEndpoint) +
        "\n" +
        patchSkull(camelCaseEndpoint, pascalCaseEndpoint) +
        "\n" +
        deleteSkull(camelCaseEndpoint, pascalCaseEndpoint)
    );
    //Api models
    fs.writeFile(path.join(apiDirectory, `schemas.ts`), apiSchemaSkull(camelCaseEndpoint, pascalCaseEndpoint));
    //Actions and model
    fs.writeFile(path.join(actionDirectory, `schemas.ts`), schemaActionSkull(camelCaseEndpoint, pascalCaseEndpoint));
    fs.writeFile(path.join(actionDirectory, `actions.ts`), actionSkull(camelCaseEndpoint, pascalCaseEndpoint));
    fs.writeFile(path.join(apiDirectory, `doc.ts`), docSkull(camelCaseEndpoint, pascalCaseEndpoint));
    console.log(`CRUD files and folders for '${endpoint}' created successfully.`);

    // Add an empty model to Prisma schema
    await addEmptyModelToPrisma(endpoint);

    // Execute the Prisma generate command
    exec("npx prisma generate", (error: typeof ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error running 'npx prisma generate': ${error.message}`);
        return;
      }
      console.log(`Prisma generate completed:\n${stdout}`);

      // After generating Prisma, run migration
      console.log("Please run : npx prisma migrate dev");
    });
  } catch (err) {
    console.error(`Error creating CRUD files and folders: ${(err as Error).message}`);
  }
}

function toPascalCase(text: string) {
  return text.replace(/(\w)(\w*)/g, function (_, initial, rest) {
    return initial.toUpperCase() + rest.toLowerCase();
  });
}

function toCamelCase(text: string) {
  return text.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

async function addEmptyModelToPrisma(endpoint: string) {
  try {
    const modelDefinition = `model ${toPascalCase(endpoint)} {
  id        Int       @id @default(autoincrement())
  name      String
  createdAt DateTime? @default(now())
}`;

    // Append the model definition to the Prisma schema
    const prismaSchemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
    await fs.appendFile(prismaSchemaPath, `\n${modelDefinition}`);
    console.log(`Empty model added to Prisma schema for '${endpoint}'.`);
  } catch (err) {
    console.error(`Error adding an empty model to Prisma schema: ${(err as Error).message}`);
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
