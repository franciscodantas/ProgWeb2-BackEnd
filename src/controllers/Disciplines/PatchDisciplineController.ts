import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class PatchDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const updatedDiscipline = await prismaClient.discipline.update({
                where: { id: parseInt(id) },
                data: updates,
            });
            return response.status(200).json(updatedDiscipline);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while partially updating the discipline." });
        }
    }
}
