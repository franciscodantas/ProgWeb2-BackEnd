import { Router } from 'express';
import { GetProfessorsController } from '../controllers/users/GetProfessorsController';
import { GetStudentsController } from '../controllers/users/GetStudentsController';
import { GetStudentsByIdController } from '../controllers/users/GetStudentsByIdController';
import { GetProfessorByIdController } from '../controllers/users/GetProfessorByIdController';
import { CreateStudentController } from '../controllers/users/CreateStudentController';
import { UpdateStudentController } from '../controllers/users/UpdateStudentController';
import { PatchStudentController } from '../controllers/users/PatchStudentController';
import { DeleteStudentController } from '../controllers/users/DeleteStudentController';
import { CreateProfessorController } from '../controllers/users/CreateProfessorController';
import { DeleteProfessorController } from '../controllers/users/DeleteProfessorController';
import { UpdateProfessorController } from '../controllers/users/UpdateProfessorController';
import { PatchProfessorController } from '../controllers/users/PatchProfessorController';

const userRoutes = Router();

const getProfessorsController = new GetProfessorsController();
const getStudentsController = new GetStudentsController();
const getStudentsByIdController = new GetStudentsByIdController();
const getProfessorByIdController = new GetProfessorByIdController();

const createStudentController = new CreateStudentController();
const updateStudentController = new UpdateStudentController();
const patchStudentController = new PatchStudentController();
const updateProfessorController = new UpdateProfessorController();
const patchProfessorController = new PatchProfessorController();
const deleteStudentController = new DeleteStudentController();
const deleteProfessorController = new DeleteProfessorController();
const createProfessorController = new CreateProfessorController();


userRoutes.get('/api/users/students', getStudentsController.handle);
userRoutes.get('/api/user/students/:id', getStudentsByIdController.handle);
userRoutes.post('/api/users/students', createStudentController.handle);
userRoutes.put('/api/users/students/:id', updateStudentController.handle);
userRoutes.patch('/api/users/students/:id', patchStudentController.handle);
userRoutes.delete('/api/users/students/:id', deleteStudentController.handle);

userRoutes.get('/api/users/professors', getProfessorsController.handle);
userRoutes.get('/api/user/professors/:id', getProfessorByIdController.handle);
userRoutes.put('/api/users/professors/:id', updateProfessorController.handle);
userRoutes.patch('/api/users/professors/:id', patchProfessorController.handle);
userRoutes.delete('/api/users/professors/:id', deleteProfessorController.handle);
userRoutes.post('/api/users/professors/', createProfessorController.handle);

export { userRoutes };
