import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateDisciplineController {
    async handle(request: Request, response: Response) {
        const { courseCode, curriculumCode, subjectCode, name, type } = request.body;

        try {
            const newDiscipline = await prismaClient.discipline.create({
                data: {
                    courseCode,
                    curriculumCode,
                    subjectCode,
                    name,
                    type,
                },
            });
            return response.status(201).json(newDiscipline);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while creating the discipline." });
        }
    }
}
