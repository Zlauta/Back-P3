import express from "express";
import { connectDB } from "./src/config/config.db.js";
import routes from "./src/routes/index.routes.js";
import morgan from "morgan";
import cors from "cors";
import manejadorDeErrores from "./src/middlewares/manejadorDeErrores.js";

connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;



app.use("/api", routes);

app.use(manejadorDeErrores)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
