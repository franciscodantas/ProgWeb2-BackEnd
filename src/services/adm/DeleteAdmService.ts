import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteAdmService {
    async delete(id: any) {
        try {
            const deletedAdm = await prismaClient.adm.delete({
                where: { id: parseInt(id) },
            });
            return deletedAdm;
        } catch (error) {
            console.error('Error deleting discipline:', error);
            if (error instanceof Error && error.message.includes('Record to delete does not exist.')) {
                return new Error("Admin not found.");
            }
            return error;
        }
    }
}