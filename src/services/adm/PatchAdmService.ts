import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class PatchAdmService {
    async patchAdm(id: number, updates: any) {
        try {
            const updatedAdm = await prismaClient.adm.update({
                where: { id },
                data: updates,
            });
            return updatedAdm || new Error("Adm not found.");
        } catch (error) {
            console.error('Error updating admin:', error);
            return error;
        }
    }
}
