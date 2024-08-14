import { Router } from 'express';
import { GetAdminsController } from '../controllers/adms/GetAdminsController';
import { GetAdminByIdController } from '../controllers/adms/GetAdminByIdController';
import { CreateAdmController } from '../controllers/adms/CreateAdmController';
import { UpdateAdmController } from '../controllers/adms/UpdateAdmController';
import { PatchAdmController } from '../controllers/adms/PatchAdmController';
import { DeleteAdmController } from '../controllers/adms/DeleteAdmController';

const admRoutes = Router();

const getAdminsController = new GetAdminsController();
const getAdminByIdController = new GetAdminByIdController();
const createAdmController = new CreateAdmController();
const updateAdmController = new UpdateAdmController();
const patchAdmController = new PatchAdmController();
const deleteAdmController = new DeleteAdmController();

admRoutes.get('/admins', getAdminsController.handle);
admRoutes.get('/admin/:id', getAdminByIdController.handle)
admRoutes.post('/admin', createAdmController.handle);
admRoutes.put('/admin/:id', updateAdmController.handle);
admRoutes.patch('/admin/:id', patchAdmController.handle);
admRoutes.delete('/admins/:id', deleteAdmController.handle);

export { admRoutes };
