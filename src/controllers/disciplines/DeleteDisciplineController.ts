import { Request, Response } from 'express';
import { DeleteDisciplineService } from '../../services/discipline/DeleteDisciplineService';

export class DeleteDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const disciplineService = new DeleteDisciplineService();
            const result = await disciplineService.deleteDiscipline(Number(id));

            if (result instanceof Error) {
                return response.status(404).json({ error: result.message });
            }

            return response.status(204).json(result);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ error: "An unexpected error occurred.", info: error.message, stackTrace: error.stack });
            }
        }
    }
}
