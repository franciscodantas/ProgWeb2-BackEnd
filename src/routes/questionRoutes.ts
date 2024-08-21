import { Router } from 'express';
import { CreateQuestionController } from '../controllers/questions/CreateQuestionController';
import { GetQuestionsController } from '../controllers/questions/GetQuestionsController';
import { GetQuestionByIdController } from '../controllers/questions/GetQuestionByIdController';
import { UpdateQuestionController } from '../controllers/questions/UpdateQuestionController';
import { DeleteQuestionController } from '../controllers/questions/DeleteQuestionController';
import { PatchQuestionController } from '../controllers/questions/PatchQuestionController';

const questionRoutes = Router();

const createQuestionController = new CreateQuestionController();
const getQuestionsController = new GetQuestionsController();
const getQuestionByIdController = new GetQuestionByIdController();
const updateQuestionController = new UpdateQuestionController();
const deleteQuestionController = new DeleteQuestionController();
const patchQuestionController = new PatchQuestionController();

questionRoutes.post('/api/questions', createQuestionController.handle);
questionRoutes.get('/api/questions', getQuestionsController.handle);
questionRoutes.get('/api/questions/:id', getQuestionByIdController.handle);
questionRoutes.put('/api/questions/:id', updateQuestionController.handle);
questionRoutes.patch('/api/questions/:id', patchQuestionController.handle);
questionRoutes.delete('/api/questions/:id', deleteQuestionController.handle);

export { questionRoutes };
