import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class UpdateAdmService {
    async updateAdm(id: number, name: string, email: string) {
        try {
            const updatedAdm = await prismaClient.adm.update({
                where: { id },
                data: { name, email },
            });
            return updatedAdm|| new Error("Adm not found.");
        } catch (error) {
            console.error('Error updating admin:', error);
            return error;
        }
    }
}
