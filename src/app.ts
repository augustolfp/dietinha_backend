import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import errorHandlerMW from "./middlewares/errorHandlerMW";
import swaggerDocs from "../swagger.json";

dotenv.config();
const app = express();

const URL_PATH_PREFIX = process.env.URL_PATH_PREFIX;

app.use(express.json(), cors());
app.use(
    `${URL_PATH_PREFIX}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);
app.use(URL_PATH_PREFIX, router);
app.use(errorHandlerMW);

export default app;
