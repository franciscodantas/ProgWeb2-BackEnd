import { Request, Response } from 'express';
import { AdmValidation } from '../../validation/AdmValidation';
import { CreateAdmService } from '../../services/adm/CreateAdmService';

export class CreateAdmController {


    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {
            const validationErrors = AdmValidation.validate({ name, email, password });
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const admService = new CreateAdmService();
            const newAdm = await admService.createAdm(name, email, password);

            if (newAdm instanceof Error) {
                return response.status(400).json({ error: "An error occurred while creating the adm.", info: newAdm });
            }

            return response.status(201).json(newAdm);
        } catch (error) {
            if (error instanceof Error){
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
