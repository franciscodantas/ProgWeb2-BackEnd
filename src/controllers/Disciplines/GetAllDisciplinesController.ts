import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetAllDisciplinesController {
    async handle(request: Request, response: Response) {
        try {
            const disciplines = await prismaClient.discipline.findMany({
                include: {
                    questions: true
                }
            });
            return response.status(200).json(disciplines);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching disciplines." });
        }
    }
}
