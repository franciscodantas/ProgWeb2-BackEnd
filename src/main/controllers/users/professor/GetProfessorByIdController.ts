import { Request, Response } from 'express';
import { GetProfessorByIdService } from '../../../services/user/professor/GetProfessorByIdService';

export class GetProfessorByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const getProfessorByIdService = new GetProfessorByIdService();
            const professor = await getProfessorByIdService.getProfessorById(parseInt(id));

            return response.status(200).json(professor);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Professor not found.") {
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
