import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class DeleteDisciplineService {
    async deleteDiscipline(id: number) {
        try {
            const deletedDiscipline = await prismaClient.discipline.delete({
                where: { id }
            });
            return deletedDiscipline;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Discipline not found.");
            }
            console.error('Error deleting discipline:', error);
            throw error;
        }
    }
}
