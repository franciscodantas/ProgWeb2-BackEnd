import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetAdminsService {
    async getAdmins() {
        try {
            const admins = await prismaClient.adm.findMany({});
            return admins;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Adm not found.");
            }
            console.error('Error deleting ADM:', error);
            throw error; 
        }
    }
}
