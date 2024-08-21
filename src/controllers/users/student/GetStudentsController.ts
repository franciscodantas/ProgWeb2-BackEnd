import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetStudentsController {
    async handle(request: Request, response: Response) {
        try {
            const students = await prismaClient.student.findMany({
                include: {
                    Question: true
                }
            });
            return response.status(200).json(students);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching students." });
        }
    }
}
