import { Router } from 'express';
import { GetProfessorsController } from '../controllers/users/professor/GetProfessorsController';
import { GetStudentsController } from '../controllers/users/student/GetStudentsController';
import { GetStudentsByIdController } from '../controllers/users/student/GetStudentsByIdController';
import { GetProfessorByIdController } from '../controllers/users/professor/GetProfessorByIdController';
import { CreateStudentController } from '../controllers/users/student/CreateStudentController';
import { UpdateStudentController } from '../controllers/users/student/UpdateStudentController';
import { PatchStudentController } from '../controllers/users/student/PatchStudentController';
import { DeleteStudentController } from '../controllers/users/student/DeleteStudentController';
import { CreateProfessorController } from '../controllers/users/professor/CreateProfessorController';
import { DeleteProfessorController } from '../controllers/users/professor/DeleteProfessorController';
import { UpdateProfessorController } from '../controllers/users/professor/UpdateProfessorController';
import { PatchProfessorController } from '../controllers/users/professor/PatchProfessorController';

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
userRoutes.get('/api/users/students/:id', getStudentsByIdController.handle);
userRoutes.post('/api/users/students', createStudentController.handle);
userRoutes.put('/api/users/students/:id', updateStudentController.handle);
userRoutes.patch('/api/users/students/:id', patchStudentController.handle);
userRoutes.delete('/api/users/students/:id', deleteStudentController.handle);

userRoutes.get('/api/users/professors', getProfessorsController.handle);
userRoutes.get('/api/users/professors/:id', getProfessorByIdController.handle);
userRoutes.post('/api/users/professors/', createProfessorController.handle);
userRoutes.put('/api/users/professors/:id', updateProfessorController.handle);
userRoutes.patch('/api/users/professors/:id', patchProfessorController.handle);
userRoutes.delete('/api/users/professors/:id', deleteProfessorController.handle);

export { userRoutes };
