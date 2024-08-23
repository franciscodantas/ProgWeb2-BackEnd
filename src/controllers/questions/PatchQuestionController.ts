import { Request, Response } from 'express';
import { PatchQuestionService } from '../../services/questionn/PatchQuestionService';

export class PatchQuestionController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const questionService = new PatchQuestionService();
            const result = await questionService.patchQuestion(Number(id), updates);

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
            } else {
                return response.status(500).json({ error: "An unexpected error occurred." });
            }
        }
    }
}
