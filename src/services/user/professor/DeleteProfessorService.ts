import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class DeleteProfessorService {
    async deleteProfessor(id: number) {
        try {
            const deletedProfessor = await prismaClient.professor.delete({
                where: { id }
            });
            return deletedProfessor;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Professor not found.");
            }
            console.error('Error deleting professor:', error);
            throw error;
        }
    }
}
