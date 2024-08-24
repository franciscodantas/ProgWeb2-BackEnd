import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UpdateProfessorService } from '../../../services/user/professor/UpdateProfessorService';

const prismaClient = new PrismaClient();

export class UpdateProfessorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {name, identityProviderId, code, email, disciplines }= request.body;

        try {
            const updatedProfessorService = new UpdateProfessorService();
            const updatedUser = await updatedProfessorService.updateProfessor(parseInt(id), {
                name,
                identityProviderId,
                code,
                email,
                disciplines,
            });

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
