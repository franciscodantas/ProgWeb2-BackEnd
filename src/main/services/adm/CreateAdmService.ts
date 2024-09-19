import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../utils/BcryptUtil';


export class CreateAdmService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async createAdm(name: any, email: any, password: any) {
        try {
            const hash = await BcryptUtils.hashPassword(password);
            const newAdm = await this.prismaClient.adm.create({
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
