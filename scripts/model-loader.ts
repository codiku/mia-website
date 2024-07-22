const fs = require("fs");
const path = require("path");

const swaggerFilePath = path.join(__dirname, "../libs", "swagger.ts");
const apiBasePath = path.join(__dirname, "../app", "api");

// This script updates the import for the models to be loaded in the swagger.ts file
async function updateSwaggerFile() {
  try {
    // Read the current contents of the swagger.ts file
    let swaggerFileContent = fs.readFileSync(swaggerFilePath, "utf8");

    // Remove all existing model imports
    swaggerFileContent = swaggerFileContent.replace(/import \* as [^ ]+ from '@\/app\/api\/[^\/]+\/models';\n/g, "");

    // Get all folders in the /app/api directory excluding 'auth'
    const apiFolders = fs.readdirSync(apiBasePath).filter((folder: string) => folder !== "auth");

    // Generate new import statements and update zodModels object
    let newImports = "";
    let newZodModelsEntries = "...PrismaGeneratedZodModels";

    for (const folder of apiFolders) {
      const modelName = `${folder.charAt(0).toUpperCase() + folder.slice(1)}ApiModels`;
      const importPath = `@/app/api/${folder}/schemas`;
      newImports += `import * as ${modelName} from '${importPath}';\n`;
      newZodModelsEntries += `, ...${modelName}`;
    }

    // Insert new import statements after the last existing import
    swaggerFileContent = swaggerFileContent.replace(/(import [^;]+;\s*?)(?=\nconst zodModels)/, `$1${newImports}`);

    // Replace the zodModels line with the new one
    const zodModelsRegex = /const zodModels= {[^}]+}/;
    swaggerFileContent = swaggerFileContent.replace(zodModelsRegex, `const zodModels= {${newZodModelsEntries}}`);

    // Write the updated content back to the swagger.ts file
    fs.writeFileSync(swaggerFilePath, swaggerFileContent, "utf8");
    console.log("swagger.ts has been updated successfully.");
  } catch (error) {
    console.error("Failed to update swagger.ts:", error);
  }
}

updateSwaggerFile();
