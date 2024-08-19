import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetAdminByIdService {
    async getAdminById(id: number) {
        try {
            const admin = await prismaClient.adm.findUnique({
                where: { id }
            });
            return admin || new Error("Adm not found.");
        } catch (error) {
            console.error('Error fetching admin:', error);
            return error;
        }
    }
}
