import { Request, Response } from 'express';
import { UpdateQuestionService } from '../../services/questionn/UpdateQuestionService';

export class UpdateQuestionController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { title, content, answer, image } = request.body;

        try {
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
