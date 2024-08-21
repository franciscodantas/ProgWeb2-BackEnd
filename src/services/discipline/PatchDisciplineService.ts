import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class PatchDisciplineService {
    async patchDiscipline(id: number, updates: any) {
        try {
            const updatedDiscipline = await prismaClient.discipline.update({
                where: { id },
                data: updates,
            });
            return updatedDiscipline || new Error("Discipline not found.");
        } catch (error) {
            console.error('Error updating discipline:', error);
            return error;
        }
    }
}
