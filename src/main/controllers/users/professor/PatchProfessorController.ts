import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PatchProfessorService } from '../../../services/user/professor/PatchProfessorService';
import { ProfessorValidation } from '../../../validation/ProfessorValidation';

const prismaClient = new PrismaClient();

export class PatchProfessorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const validationErrors = ProfessorValidation.validatePatch(updates);
            if (validationErrors) {
                return response.status(400).json({ errors: validationErrors });
            }
            const patchProfessorService = new PatchProfessorService();
            const updatedUser = await patchProfessorService.patchProfessor(parseInt(id), updates);

            return response.status(200).json(updatedUser);
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
