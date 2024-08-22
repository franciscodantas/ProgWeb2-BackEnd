import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetStudentByIdService {
    async getStudentById(id: number) {
        try {
            const student = await prismaClient.student.findUnique({
                where: { id },
                include: {
                    Question: true,
                },
            });

            return student;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error("Student not found.");
            }
            console.error('Error fetching Student:', error);
            throw error;
        }
    }
}
