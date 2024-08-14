import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateAdmService {
    async createAdm(name: string, email: string): Promise<any> {
        try {
            const newAdm = await prismaClient.adm.create({
                data: {
                    name,
                    email,
                },
            });
            return newAdm;
        } catch (error) {
            console.error('Error creating admin:', error);
            return error;
        }
    }
}
