import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateDisciplineService {
    async createDiscipline(data: {
        courseCode: string;
        curriculumCode: string;
        subjectCode: string;
        name: string;
        type: string;
    }) {
        try {
            const newDiscipline = await prismaClient.discipline.create({
                data: {
                    courseCode: data.courseCode,
                    curriculumCode: data.curriculumCode,
                    subjectCode: data.subjectCode,
                    name: data.name,
                    type: data.type,
                },
            });
            return newDiscipline;
        } catch (error) {
            console.error('Error creating discipline:', error);
            return error;
        }
    }
}