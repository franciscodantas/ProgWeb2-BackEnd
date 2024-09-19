import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BcryptUtils } from '../../utils/BcryptUtil';


export class UpdateAdmService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async updateAdm(id: number, name: string, email: string, password: string) {
        try {
            const hash = await BcryptUtils.hashPassword(password);
            const updatedAdm = await this.prismaClient.adm.update({
                where: { id },
                data: { name, email, password: hash},
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
