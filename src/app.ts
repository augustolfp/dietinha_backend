import express from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import errorHandlerMW from "./middlewares/errorHandlerMW";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json(), cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.use(errorHandlerMW);

export default app;
