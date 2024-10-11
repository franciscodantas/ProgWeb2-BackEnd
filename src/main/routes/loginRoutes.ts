import { Router } from 'express';
import { AuthController } from '../controllers/auth/AuthController';
import { authenticateToken } from '../services/auth/AuthService';

const authController = new AuthController();
const loginRouter = Router();

loginRouter.post('/login/professor', authController.loginProfessor);
loginRouter.post('/login/student', authController.loginStudent);
loginRouter.post('/login/adm', authController.loginAdm);
loginRouter.get('/profile', authenticateToken, authController.getProfile);

export default loginRouter;
