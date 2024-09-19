import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class DeleteProfessorService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async deleteProfessor(id: number) {
        try {
            const deletedProfessor = await this.prismaClient.professor.delete({
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
