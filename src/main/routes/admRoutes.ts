import { Router } from 'express';
import { GetAdminsController } from '../controllers/adms/GetAdminsController';
import { GetAdminByIdController } from '../controllers/adms/GetAdminByIdController';
import { CreateAdmController } from '../controllers/adms/CreateAdmController';
import { UpdateAdmController } from '../controllers/adms/UpdateAdmController';
import { PatchAdmController } from '../controllers/adms/PatchAdmController';
import { DeleteAdmController } from '../controllers/adms/DeleteAdmController';
import { authenticateToken, authorizeRoles, authorizeSelfUpdate } from '../services/auth/AuthService';

const admRoutes = Router();

const getAdminsController = new GetAdminsController();
const getAdminByIdController = new GetAdminByIdController();
const createAdmController = new CreateAdmController();
const updateAdmController = new UpdateAdmController();
const patchAdmController = new PatchAdmController();
const deleteAdmController = new DeleteAdmController();

admRoutes.get('/api/admins', authenticateToken, authorizeRoles('Adm'),  getAdminsController.handle);
admRoutes.get('/api/admins/:id', authenticateToken, authorizeRoles('Adm'), getAdminByIdController.handle)
admRoutes.post('/api/admins',authenticateToken, authorizeRoles('Adm'), createAdmController.handle);
admRoutes.put('/api/admins/:id',authenticateToken, authorizeSelfUpdate(), updateAdmController.handle);
admRoutes.patch('/api/admins/:id',authenticateToken, authorizeSelfUpdate(), patchAdmController.handle);
admRoutes.delete('/api/admins/:id', authenticateToken, authorizeRoles('Adm'),deleteAdmController.handle);

export { admRoutes };
