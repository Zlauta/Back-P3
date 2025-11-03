import express from "express";
import { connectDB } from "./src/config/config.db.js";
import routes from "./src/routes/index.routes.js";

connectDB();

const app = express();
const PORT = 3000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
