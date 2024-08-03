import { Router } from 'express';
import { GetProfessorsController } from '../controllers/Users/GetProfessorsController';
import { GetStudentsController } from '../controllers/Users/GetStudentsController';
import { GetAdminsController } from '../controllers/Users/GetAdminsController';
import { GetStudentsByIdController } from '../controllers/Users/GetStudentsByIdController';
import { GetAdminByIdController } from '../controllers/Users/GetAdminByIdController';
import { GetProfessorByIdController } from '../controllers/Users/GetProfessorByIdController';

const userRoutes = Router();

const getProfessorsController = new GetProfessorsController();
const getStudentsController = new GetStudentsController();
const getAdminsController = new GetAdminsController();
const getStudentsByIdController = new GetStudentsByIdController();
const getAdminByIdController = new GetAdminByIdController();
const getProfessorByIdController = new GetProfessorByIdController();

userRoutes.get('/users/professors', getProfessorsController.handle);
userRoutes.get('/users/students', getStudentsController.handle);
userRoutes.get('/users/admins', getAdminsController.handle);
userRoutes.get('/user/students/:id', getStudentsByIdController.handle)
userRoutes.get('/user/professors/:id', getProfessorByIdController.handle)
userRoutes.get('/user/admin/:id', getAdminByIdController.handle)


export { userRoutes };
