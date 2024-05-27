import { Router } from "express";
import { getPublicGif } from "../controller/image";

export const imageRouter = Router();

imageRouter.get("/public/:id", getPublicGif);
