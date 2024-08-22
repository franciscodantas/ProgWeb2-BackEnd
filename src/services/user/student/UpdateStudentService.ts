import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class UpdateStudentService {
    async updateStudent(id: number, data: {
        name: string;
        identityProviderId: string;
        code: string;
        email: string;
    }) {
        try {
            const updatedStudent = await prismaClient.student.update({
                where: { id },
                data: {
                    name: data.name,
                    identityProviderId: data.identityProviderId,
                    code: data.code,
                    email: data.email,
                },
            });

            return updatedStudent;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Student not found.");
            }
            console.error('Error updating student:', error);
            throw error;
        }
    }
}
