import { Router } from 'express';
import { GetAllDisciplinesController } from '../controllers/Disciplines/GetAllDisciplinesController';
import { GetDisciplineByIdController } from '../controllers/Disciplines/GetDisciplineByIdController';

const disciplineRoutes = Router();

const getAllDisciplinesController = new GetAllDisciplinesController();
const getDisciplineByIdController = new GetDisciplineByIdController();

disciplineRoutes.get('/disciplines', getAllDisciplinesController.handle);
disciplineRoutes.get('/disciplines/:id', getDisciplineByIdController.handle);

export { disciplineRoutes };
