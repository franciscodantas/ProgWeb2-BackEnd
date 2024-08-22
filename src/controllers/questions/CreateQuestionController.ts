import { Request, Response } from 'express';
import { CreateQuestionService } from '../../services/questionn/CreateQuestionService';

export class CreateQuestionController {
    async handle(request: Request, response: Response) {
        const { title, content, answer, image, professorId, studentId, disciplineId } = request.body;

        try {

            const createQuestionService = new CreateQuestionService();
            const question = await createQuestionService.createQuestion({
                title,
                content,
                answer,
                image,
                professorId,
                studentId,
                disciplineId,
            });

            if (question instanceof Error) {
                if (question.message === "Discipline not found.") {
                    return response.status(400).json({ error: question.message });
                } else if (question.message === "Question with the same title already exists.") {
                    return response.status(400).json({ error: question.message });
                } else if (question.message === "Author not found."){
                    return response.status(400).json({ error: question.message });
                }
            }

            return response.status(201).json(question);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack,
                });
            }
        }
    }
}
