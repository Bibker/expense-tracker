const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Expense-Tracker Backend API",
    description: "Description",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger.json";
const routes = ["./index.js"];

swaggerAutogen(outputFile, routes, doc);
