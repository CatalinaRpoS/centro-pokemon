import { TrainerModel } from '../models/trainer.js';

export class TrainerController {
    static async getAllStatus (req, res) {
        try {
            const status = await TrainerModel.getAllStatus()
            res.json(status)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getAllTypes (req, res) {
        try {
            const types = await TrainerModel.getAllTypes()
            res.json(types)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
