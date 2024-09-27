import { Router } from "express";
import { TrainerController } from "../controllers/trainer.js";

export const root = Router();

root.post("/login", TrainerController.login);