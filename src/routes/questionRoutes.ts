import { Router } from 'express';
import { CreateQuestionController } from '../controllers/Questions/CreateQuestionController';
import { GetQuestionsController } from '../controllers/Questions/GetQuestionsController';
import { GetQuestionByIdController } from '../controllers/Questions/GetQuestionByIdController';
import { UpdateQuestionController } from '../controllers/Questions/UpdateQuestionController';
import { DeleteQuestionController } from '../controllers/Questions/DeleteQuestionController';
import { PatchQuestionController } from '../controllers/Questions/PatchQuestionController';

const questionRoutes = Router();

const createQuestionController = new CreateQuestionController();
const getQuestionsController = new GetQuestionsController();
const getQuestionByIdController = new GetQuestionByIdController();
const updateQuestionController = new UpdateQuestionController();
const deleteQuestionController = new DeleteQuestionController();
const patchQuestionController = new PatchQuestionController();

questionRoutes.post('/questions', createQuestionController.handle);
questionRoutes.get('/questions', getQuestionsController.handle);
questionRoutes.get('/questions/:id', getQuestionByIdController.handle);
questionRoutes.put('/questions/:id', updateQuestionController.handle);
questionRoutes.patch('/questions/:id', patchQuestionController.handle);
questionRoutes.delete('/questions/:id', deleteQuestionController.handle);

export { questionRoutes };
