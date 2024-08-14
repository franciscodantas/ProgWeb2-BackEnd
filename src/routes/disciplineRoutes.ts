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

disciplineRoutes.get('/disciplines', getAllDisciplinesController.handle);
disciplineRoutes.get('/disciplines/:id', getDisciplineByIdController.handle);
disciplineRoutes.post('/disciplines', createDisciplineController.handle);
disciplineRoutes.patch('/disciplines/:id', patchDisciplineController.handle);
disciplineRoutes.delete('/disciplines/:id', deleteDisciplineController.handle);
disciplineRoutes.put('/disciplines/:id', updateDisciplineController.handle);


export { disciplineRoutes };
