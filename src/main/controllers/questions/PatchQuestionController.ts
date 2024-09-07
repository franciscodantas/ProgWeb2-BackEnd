import { Request, Response } from 'express';
import { QuestionValidation } from '../../validation/QuestionValidation';
import { PatchQuestionService } from '../../services/question/PatchQuestionService';

export class PatchQuestionController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const validationErrors = QuestionValidation.validatePatch(updates);

            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            
            const questionService = new PatchQuestionService();
            const result = await questionService.patchQuestion(parseInt(id), updates);

            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Question not found.") {
                    return response.status(404).json({ error: error.message });
                }
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
