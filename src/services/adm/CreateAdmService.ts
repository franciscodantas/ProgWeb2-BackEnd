import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../utils/BcryptUtil';

const prismaClient = new PrismaClient();

export class CreateAdmService {
    async createAdm(name: any, email: any, password: any) {
        try {
            const hash = await BcryptUtils.hashPassword(password);
            const newAdm = await prismaClient.adm.create({
                data: {
                    name,
                    email,
                    password: hash
                },
            });
            return newAdm;
        } catch (error) {
            console.error('Error creating admin:', error);
            return error;
        }
    }
}
