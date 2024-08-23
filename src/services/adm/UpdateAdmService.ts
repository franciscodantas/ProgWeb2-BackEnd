import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class UpdateAdmService {
    async updateAdm(id: number, name: string, email: string) {
        try {
            const updatedAdm = await prismaClient.adm.update({
                where: { id },
                data: { name, email },
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
