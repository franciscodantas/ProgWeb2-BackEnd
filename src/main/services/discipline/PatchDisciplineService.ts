import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class PatchDisciplineService {
    async patchDiscipline(id: number, updates: any) {
        try {
            const updatedDiscipline = await prismaClient.discipline.update({
                where: { id },
                data: updates,
            });
            return updatedDiscipline;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Discipline not found.");
            }
            console.error('Error deleting discipline:', error);
            throw error;
        }
    }
}
