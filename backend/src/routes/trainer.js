import { Router } from 'express';
import { TrainerController } from '../controllers/trainer.js';

export const trainerRouter = Router();

trainerRouter.get('/status', TrainerController.getAllStatus);
trainerRouter.get('/types', TrainerController.getAllTypes);
