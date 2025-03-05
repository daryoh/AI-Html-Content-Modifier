import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response, NextFunction } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI HTML Modifier API",
      version: "1.0.0",
      description:
        "API that modifies HTML content and generates AI-powered images.",
    },
    servers: [],
    components: {
      schemas: {
        ProcessHtmlRequest: {
          type: "object",
          properties: {
            htmlContent: {
              type: "string",
              description: "The HTML content to process",
            },
            siteName: {
              type: "string",
              description: "The name of the website",
            },
            keywords: {
              type: "array",
              items: {
                type: "string",
              },
              description: "A list of keywords relevant to the website",
            },
          },
          required: ["htmlContent", "siteName", "keywords"],
        },
        ProcessHtmlResponse: {
          type: "object",
          properties: {
            modifiedHtml: {
              type: "string",
              description: "The modified HTML content",
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions) as {
  servers?: { url: string; description: string }[];
};

export function setupSwagger(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    (req: Request, res: Response, next: NextFunction) => {
      return swaggerUi.setup(swaggerDocs)(req, res, next);
    },
  );

  console.log("📄 Swagger Docs will be available at /api-docs");
}
