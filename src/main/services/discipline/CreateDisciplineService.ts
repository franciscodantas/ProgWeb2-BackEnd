import { PrismaClient } from '@prisma/client';

export class CreateDisciplineService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    async createDiscipline(data: {
        courseCode: string;
        curriculumCode: string;
        subjectCode: string;
        name: string;
        type: string;
    }) {
        try {
            const newDiscipline = await this.prismaClient.discipline.create({
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