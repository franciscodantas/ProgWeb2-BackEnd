import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetDisciplineByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const discipline = await prismaClient.discipline.findUnique({
                where: { id: Number(id) },
                include: {
                    questions: true
                }
            });

            if (!discipline) {
                return response.status(404).json({ error: "Discipline not found." });
            }

            return response.status(200).json(discipline);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the discipline." });
        }
    }
}
