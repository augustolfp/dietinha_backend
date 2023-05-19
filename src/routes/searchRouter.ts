import { Router } from "express";
import * as searchController from "../controllers/searchController";

const searchRouter = Router();

searchRouter.get("/search/:term", searchController.search);

export default searchRouter;
