import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetAdminsService {
    async getAdmins() {
        try {
            const admins = await prismaClient.adm.findMany({});
            return admins;
        } catch (error) {
            console.error('Error fetching admins:', error);
            return error;
        }
    }
}
