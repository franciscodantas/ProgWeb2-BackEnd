import { Request, Response } from 'express';
import { GetQuestionByIdService } from '../../services/questionn/GetQuestionByIdService';
export class GetQuestionByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const questionService = new GetQuestionByIdService();
            const result = await questionService.getQuestionById(Number(id));

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
