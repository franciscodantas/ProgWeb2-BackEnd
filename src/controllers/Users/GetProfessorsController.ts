import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetProfessorsController {
    async handle(request: Request, response: Response) {
        try {
            const professors = await prismaClient.user.findMany({
                where: { type: 'Professor' },
                include: {
                    questions: true
                }
            });
            return response.status(200).json(professors);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching professors." });
        }
    }
}
