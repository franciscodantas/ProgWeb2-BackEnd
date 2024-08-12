import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const deletedDiscipline = await prismaClient.discipline.delete({
                where: { id: parseInt(id) },
            });

            return response.status(204).json(deletedDiscipline);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while deleting the discipline." });
        }
    }
}
