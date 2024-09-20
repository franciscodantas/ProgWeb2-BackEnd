import { Router } from 'express';
import { CreateQuestionController } from '../controllers/questions/CreateQuestionController';
import { GetQuestionsController } from '../controllers/questions/GetQuestionsController';
import { GetQuestionByIdController } from '../controllers/questions/GetQuestionByIdController';
import { UpdateQuestionController } from '../controllers/questions/UpdateQuestionController';
import { DeleteQuestionController } from '../controllers/questions/DeleteQuestionController';
import { PatchQuestionController } from '../controllers/questions/PatchQuestionController';
import { authenticateToken, authorizeAuthorOrAdmin, authorizeQuestionCreation } from '../services/auth/AuthService';

const questionRoutes = Router();

const createQuestionController = new CreateQuestionController();
const getQuestionsController = new GetQuestionsController();
const getQuestionByIdController = new GetQuestionByIdController();
const updateQuestionController = new UpdateQuestionController();
const deleteQuestionController = new DeleteQuestionController();
const patchQuestionController = new PatchQuestionController();

questionRoutes.post('/api/questions', authenticateToken, authorizeQuestionCreation, createQuestionController.handle);
questionRoutes.get('/api/questions', getQuestionsController.handle);
questionRoutes.get('/api/questions/:id', getQuestionByIdController.handle);
questionRoutes.put('/api/questions/:id', authenticateToken, authorizeAuthorOrAdmin, updateQuestionController.handle);
questionRoutes.patch('/api/questions/:id', authenticateToken, authorizeAuthorOrAdmin, patchQuestionController.handle);
questionRoutes.delete('/api/questions/:id', authenticateToken, authorizeAuthorOrAdmin, deleteQuestionController.handle);

export { questionRoutes };
