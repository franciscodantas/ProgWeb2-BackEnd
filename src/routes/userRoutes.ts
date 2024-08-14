import { Router } from 'express';
import { GetProfessorsController } from '../controllers/users/GetProfessorsController';
import { GetStudentsController } from '../controllers/users/GetStudentsController';
import { GetStudentsByIdController } from '../controllers/users/GetStudentsByIdController';
import { GetProfessorByIdController } from '../controllers/users/GetProfessorByIdController';
import { CreateUserController } from '../controllers/users/CreateUserController';
import { UpdateUserController } from '../controllers/users/UpdateUserController';
import { PatchUserController } from '../controllers/users/PatchUserController';
import { DeleteUserController } from '../controllers/users/DeleteUserController';

const userRoutes = Router();

const getProfessorsController = new GetProfessorsController();
const getStudentsController = new GetStudentsController();
const getStudentsByIdController = new GetStudentsByIdController();
const getProfessorByIdController = new GetProfessorByIdController();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const partialUpdateUserController = new PatchUserController();
const deleteUserController = new DeleteUserController();

userRoutes.get('/users/professors', getProfessorsController.handle);
userRoutes.get('/users/students', getStudentsController.handle);
userRoutes.get('/user/students/:id', getStudentsByIdController.handle);
userRoutes.get('/user/professors/:id', getProfessorByIdController.handle);
userRoutes.post('/users', createUserController.handle);
userRoutes.put('/users/:id', updateUserController.handle);
userRoutes.patch('/users/:id', partialUpdateUserController.handle);
userRoutes.delete('/users/:id', deleteUserController.handle);

export { userRoutes };
