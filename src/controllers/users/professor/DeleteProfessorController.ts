import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteProfessorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const deletedUser = await prismaClient.professor.delete({
                where: { id: parseInt(id) },
            });

            return response.status(200).json(deletedUser);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while deleting the user." });
        }
    }
}
