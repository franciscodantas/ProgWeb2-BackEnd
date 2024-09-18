import { Router } from 'express';
import { GetAdminsController } from '../controllers/adms/GetAdminsController';
import { GetAdminByIdController } from '../controllers/adms/GetAdminByIdController';
import { CreateAdmController } from '../controllers/adms/CreateAdmController';
import { UpdateAdmController } from '../controllers/adms/UpdateAdmController';
import { PatchAdmController } from '../controllers/adms/PatchAdmController';
import { DeleteAdmController } from '../controllers/adms/DeleteAdmController';
import { authenticateToken, authorizeRoles } from '../services/auth/AuthService';

const admRoutes = Router();
admRoutes.use(authenticateToken);

const getAdminsController = new GetAdminsController();
const getAdminByIdController = new GetAdminByIdController();
const createAdmController = new CreateAdmController();
const updateAdmController = new UpdateAdmController();
const patchAdmController = new PatchAdmController();
const deleteAdmController = new DeleteAdmController();

admRoutes.get('/api/admins', authenticateToken, authorizeRoles('Admin'),  getAdminsController.handle);
admRoutes.get('/api/admins/:id', authenticateToken, authorizeRoles('Admin'), getAdminByIdController.handle)
admRoutes.post('/api/admins',authenticateToken, authorizeRoles('Admin'), createAdmController.handle);
admRoutes.put('/api/admins/:id',authenticateToken, authorizeRoles('Admin'), updateAdmController.handle);
admRoutes.patch('/api/admins/:id',authenticateToken, authorizeRoles('Admin'), patchAdmController.handle);
admRoutes.delete('/api/admins/:id', authenticateToken, authorizeRoles('Admin'),deleteAdmController.handle);

export { admRoutes };
