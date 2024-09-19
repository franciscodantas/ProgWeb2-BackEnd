import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class DeleteStudentService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async deleteStudent(id: number) {
        try {
            const deletedStudent = await this.prismaClient.student.delete({
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
