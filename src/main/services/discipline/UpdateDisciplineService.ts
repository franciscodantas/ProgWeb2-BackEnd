import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class UpdateDisciplineService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async updateDiscipline(id: number, data: { courseCode: string, curriculumCode: string, subjectCode: string, name: string, type: string }) {
        try {
            const updatedDiscipline = await this.prismaClient.discipline.update({
                where: { id },
                data: {
                    courseCode: data.courseCode,
                    curriculumCode: data.curriculumCode,
                    subjectCode: data.subjectCode,
                    name: data.name,
                    type: data.type,
                },
            });

            return updatedDiscipline;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error("Discipline not found.");
            }
            console.error('Error deleting discipline:', error);
            throw error;
        }
    }
}
