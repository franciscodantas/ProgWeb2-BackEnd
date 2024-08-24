import { Request, Response } from 'express';
import { DeleteQuestionService } from '../../services/questionn/DeleteQuestionService';

export class DeleteQuestionController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const questionService = new DeleteQuestionService();
            await questionService.deleteQuestion(parseInt(id));

            return response.status(204).send();
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
            } else {
                return response.status(500).json({ error: "An unexpected error occurred." });
            }
        }
    }
}
