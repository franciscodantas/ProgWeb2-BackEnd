import { PrismaClient } from '@prisma/client';

export class GetStudentService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getAllStudent() {
        try {
            const students = await this.prismaClient.student.findMany({
                include: {
                    Question: true,
                },
            });

            return students;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    }
}
