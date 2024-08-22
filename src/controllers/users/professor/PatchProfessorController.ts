import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PatchProfessorService } from '../../../services/user/professor/PatchProfessorService';

const prismaClient = new PrismaClient();

export class PatchProfessorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const patchProfessorService = new PatchProfessorService();
            const updatedUser = patchProfessorService.patchProfessor(parseInt(id), updates);

            return response.status(200).json(updatedUser);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while partially updating the user." });
        }
    }
}
