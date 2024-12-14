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
apis: ["./src/routes/*.ts"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;