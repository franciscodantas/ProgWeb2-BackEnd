import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class PatchAdmService {
    async patchAdm(id: number, updates: any) {
        try {
            const updatedAdm = await prismaClient.adm.update({
                where: { id },
                data: updates,
            });
            return updatedAdm;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error("Adm not found.");
            }
            console.error('Error deleting ADM:', error);
            throw error; 
        }
    }
}
