import { Request, Response } from 'express';
import { DeleteDisciplineService } from '../../services/discipline/DeleteDisciplineService';

export class DeleteDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const disciplineService = new DeleteDisciplineService();
            await disciplineService.deleteDiscipline(parseInt(id));

            return response.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Discipline not found.") {
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
