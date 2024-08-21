import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class UpdateDisciplineService {
    async updateDiscipline(id: number, data: { courseCode: string, curriculumCode: string, subjectCode: string, name: string, type: string }) {
        try {
            const updatedDiscipline = await prismaClient.discipline.update({
                where: { id },
                data: {
                    courseCode: data.courseCode,
                    curriculumCode: data.curriculumCode,
                    subjectCode: data.subjectCode,
                    name: data.name,
                    type: data.type,
                },
            });

            return updatedDiscipline || new Error("Discipline not found.");
        } catch (error) {
            console.error('Error updating discipline:', error);
            return error;
        }
    }
}
