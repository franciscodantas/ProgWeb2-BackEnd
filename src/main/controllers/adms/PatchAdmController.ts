import { Request, Response } from 'express';
import { PatchAdmService } from '../../services/adm/PatchAdmService';
import { AdmValidation } from '../../validation/AdmValidation';

export class PatchAdmController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const validationErrors = AdmValidation.validatePatch(updates);
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const admService = new PatchAdmService();
            const updatedAdm = await admService.patchAdm(parseInt(id), updates);

            return response.status(200).json(updatedAdm);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Adm not found.") {
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
