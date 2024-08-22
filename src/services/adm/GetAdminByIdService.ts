import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class GetAdminByIdService {
    async getAdminById(id: number) {
        try {
            const admin = await prismaClient.adm.findUnique({
                where: { id }
            });
            return admin;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Adm not found.");
            }
            console.error('Error deleting ADM:', error);
            throw error; 
        }
    }
}
