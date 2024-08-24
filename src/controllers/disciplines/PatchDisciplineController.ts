import { Request, Response } from 'express';
import { PatchDisciplineService } from '../../services/discipline/PatchDisciplineService';

export class PatchDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const disciplineService = new PatchDisciplineService();
            const result = await disciplineService.patchDiscipline(parseInt(id), updates);

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
