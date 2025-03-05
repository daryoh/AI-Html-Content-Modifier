import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI HTML Modifier API",
      version: "1.0.0",
      description:
        "API that modifies HTML content and generates AI-powered images.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
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
  apis: ["./src/controllers/*.ts"], // Point to route files where docs are defined
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("📄 Swagger Docs available at http://localhost:3000/api-docs");
}
