import { createSwaggerSpec } from "next-swagger-doc";
import * as PrismaGeneratedZodModels from "@/prisma/zod";
import { generateSchema } from "@anatine/zod-openapi";

const zodModels = {
  ...PrismaGeneratedZodModels,
};
const schemas = Object.keys(zodModels).reduce((acc, curr) => {
  (acc as any)[curr] = generateSchema((zodModels as any)[curr]);
  return acc;
}, {});

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Auth API",
        version: "1.0",
      },

      components: {
        parameters: {
          id: {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "The entity id",
          },
        },
        schemas: {
          ...schemas,
        },
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });

  return spec;
};
