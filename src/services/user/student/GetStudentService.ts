import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetStudentService {
    async getAllStudent() {
        try {
            const students = await prismaClient.student.findMany({
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
