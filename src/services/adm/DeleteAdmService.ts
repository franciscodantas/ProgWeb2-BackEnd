import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteAdmService {
    async delete(id: any) {
        try {
            const deletedAdm = await prismaClient.adm.delete({
                where: { id: parseInt(id) },
            });
            return deletedAdm|| new Error("Adm not found.");
        } catch (error) {
            console.error('Error deleting discipline:', error);
            return error;
        }
    }
}