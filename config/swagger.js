import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const __dirname = path.resolve(); // get project root path

// Read swagger.json from config folder
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config/swagger.json"), "utf-8")
);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
