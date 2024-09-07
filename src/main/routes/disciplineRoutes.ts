import { Router } from 'express';
import { GetAllDisciplinesController } from '../controllers/disciplines/GetAllDisciplinesController';
import { GetDisciplineByIdController } from '../controllers/disciplines/GetDisciplineByIdController';
import { CreateDisciplineController} from '../controllers/disciplines/CreateDisciplineController';
import { PatchDisciplineController } from '../controllers/disciplines/PatchDisciplineController';
import { UpdateDisciplineController } from '../controllers/disciplines/UpdateDisciplineController';
import { DeleteDisciplineController } from '../controllers/disciplines/DeleteDisciplineController';

const disciplineRoutes = Router();

const getAllDisciplinesController = new GetAllDisciplinesController();
const createDisciplineController = new CreateDisciplineController();
const patchDisciplineController = new PatchDisciplineController();
const updateDisciplineController = new UpdateDisciplineController();
const getDisciplineByIdController = new GetDisciplineByIdController();
const deleteDisciplineController = new DeleteDisciplineController();

disciplineRoutes.get('/api/disciplines', getAllDisciplinesController.handle);
disciplineRoutes.get('/api/disciplines/:id', getDisciplineByIdController.handle);
disciplineRoutes.post('/api/disciplines', createDisciplineController.handle);
disciplineRoutes.patch('/api/disciplines/:id', patchDisciplineController.handle);
disciplineRoutes.delete('/api/disciplines/:id', deleteDisciplineController.handle);
disciplineRoutes.put('/api/disciplines/:id', updateDisciplineController.handle);


export { disciplineRoutes };
