import { Router } from "express";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.get("/check", authController.checkAPI);

export default authRouter;
