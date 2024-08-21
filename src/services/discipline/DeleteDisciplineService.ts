import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteDisciplineService {
    async deleteDiscipline(id: number) {
        try {
            const deletedDiscipline = await prismaClient.discipline.delete({
                where: { id }
            });
            return deletedDiscipline || new Error("Discipline not found.");
        } catch (error) {
            console.error('Error deleting discipline:', error);
            return error;
        }
    }
}
