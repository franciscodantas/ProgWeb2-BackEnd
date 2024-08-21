import { Request, Response } from 'express';
import { GetDisciplineByIdService } from '../../services/discipline/GetDisciplineByIdService';

export class GetDisciplineByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const disciplineService = new GetDisciplineByIdService();
            const result = await disciplineService.getDisciplineById(Number(id));

            if (result instanceof Error) {
                return response.status(404).json({ error: result.message });
            }

            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
