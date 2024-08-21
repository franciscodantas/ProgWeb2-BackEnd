import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetProfessorsController {
    async handle(request: Request, response: Response) {
        try {
            const professors = await prismaClient.professor.findMany({
                include: {
                    Question: true,
                    disciplines: true,
                }
            });
            return response.status(200).json(professors);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching professors." });
        }
    }
}
