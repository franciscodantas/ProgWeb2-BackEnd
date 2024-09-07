import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class DeleteStudentService {
    async deleteStudent(id: number) {
        try {
            const deletedStudent = await prismaClient.student.delete({
                where: { id }
            });
            return deletedStudent;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Student not found.");
            }
            console.error('Error deleting Student:', error);
            throw error;
        }
    }
}
