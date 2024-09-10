import { Router } from 'express';
import { AuthController } from '../controllers/auth/AuthController';

const authController = new AuthController();
const loginRouter = Router();

loginRouter.post('/login/professor', authController.loginProfessor);
loginRouter.post('/login/student', authController.loginStudent);
loginRouter.post('/login/adm', authController.loginAdm);

export default loginRouter;
