import { Router } from "express";
import * as searchController from "../controllers/searchController";
import tokenValidationMW from "../middlewares/tokenValidationMW";

const searchRouter = Router();

searchRouter.get(
    "/datatable/search/:term",
    tokenValidationMW,
    searchController.search
);

export default searchRouter;
