import { Request, Response } from 'express';
import { PatchDisciplineService } from '../../services/discipline/PatchDisciplineService';
import { DisciplineValidation } from '../../validation/DisciplineValidation';

export class PatchDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const validationErrors = DisciplineValidation.validatePatch(updates);
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const disciplineService = new PatchDisciplineService();
            const result = await disciplineService.patchDiscipline(parseInt(id), updates);


            return response.status(200).json(result);
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
