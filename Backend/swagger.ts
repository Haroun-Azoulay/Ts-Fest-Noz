const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Fest-Noz API",
    version: "1.0.0",
    description: "Fest-Noz API Description",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./app.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

export default {
  swaggerSpec,
};
