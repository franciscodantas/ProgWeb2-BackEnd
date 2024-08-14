import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class UpdateDisciplineController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { courseCode, curriculumCode, subjectCode, name, type } = request.body;

        try {
            const updatedDiscipline = await prismaClient.discipline.update({
                where: { id: parseInt(id) },
                data: {
                    courseCode,
                    curriculumCode,
                    subjectCode,
                    name,
                    type,
                },
            });
            return response.status(200).json(updatedDiscipline);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while updating the discipline." });
        }
    }
}
