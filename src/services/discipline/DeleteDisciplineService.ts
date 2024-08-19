import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteDisciplineService {
    async deleteDiscipline(id: number) {
        try {
            const deletedDiscipline = await prismaClient.discipline.delete({
                where: { id }
            });
            return deletedDiscipline;
        } catch (error) {
            console.error('Error deleting discipline:', error);
            if (error instanceof Error && error.message.includes('Record to delete does not exist.')) {
                return new Error("Discipline not found.");
            }
            return error;
        }
    }
}
