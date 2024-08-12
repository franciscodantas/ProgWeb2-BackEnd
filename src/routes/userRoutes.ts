import { Router } from 'express';
import { GetProfessorsController } from '../controllers/Users/GetProfessorsController';
import { GetStudentsController } from '../controllers/Users/GetStudentsController';
import { GetStudentsByIdController } from '../controllers/Users/GetStudentsByIdController';
import { GetProfessorByIdController } from '../controllers/Users/GetProfessorByIdController';
import { CreateUserController } from '../controllers/Users/CreateUserController';
import { UpdateUserController } from '../controllers/Users/UpdateUserController';
import { PatchUserController } from '../controllers/Users/PatchUserController';
import { DeleteUserController } from '../controllers/Users/DeleteUserController';

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
