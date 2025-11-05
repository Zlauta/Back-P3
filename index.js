import express from "express";
import { connectDB } from "./src/config/config.db.js";
import routes from "./src/routes/index.routes.js";
import morgan from "morgan";
import cors from "cors";

connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const PORT = 3000;


//app.use(cors());
app.use(express.json());
//app.use(morgan("dev"));


app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
