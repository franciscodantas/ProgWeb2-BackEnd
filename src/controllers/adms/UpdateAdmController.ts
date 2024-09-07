import { Request, Response } from 'express';
import { UpdateAdmService } from '../../services/adm/UpdateAdmService';
import { AdmValidation } from '../../validation/AdmValidation';

export class UpdateAdmController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, password } = request.body;

        try {
            const validationErrors = AdmValidation.validate({ name, email, password });
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const admService = new UpdateAdmService();
            const updatedAdm = await admService.updateAdm(parseInt(id), name, email, password);

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
