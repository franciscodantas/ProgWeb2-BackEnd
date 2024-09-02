import { Request, Response } from 'express';
import { UpdateQuestionService } from '../../services/question/UpdateQuestionService';
import { QuestionValidation } from '../../validation/QuestionValidation';

export class UpdateQuestionController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { title, content, answer, image } = request.body;

        try {
            const validationErrors = QuestionValidation.validateUpdate({ title, content, answer, image });

            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            
            const questionService = new UpdateQuestionService();
            const updatedQuestion = await questionService.updateQuestion(Number(id), {
                title,
                content,
                answer,
                image
            });

            return response.status(200).json(updatedQuestion);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Question not found.") {
                    return response.status(404).json({ error: error.message });
                }
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack,
                });
            } 
        }
    }
}
