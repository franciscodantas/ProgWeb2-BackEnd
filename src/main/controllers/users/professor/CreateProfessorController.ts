import { Request, Response } from 'express';
import { ProfessorValidation } from '../../../validation/ProfessorValidation';
import { CreateProfessorService } from '../../../services/user/professor/CreateProfessorService';

export class CreateProfessorController {
    async handle(request: Request, response: Response) {
        const { id, name, identityProviderId, code, email, disciplines, password } = request.body;

        try {
            const validationErrors = ProfessorValidation.validate({ id, name, identityProviderId, code, email, disciplines, password });
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const professorService = new CreateProfessorService();
            const newProfessor = await professorService.createProfessor({
                id,
                name,
                identityProviderId,
                code,
                email,
                disciplines,
                password
            });

            if (newProfessor instanceof Error) {
                return response.status(400).json({ error: newProfessor.message });
            }

            return response.status(201).json(newProfessor);
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
