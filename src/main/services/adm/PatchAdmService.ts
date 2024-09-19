import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


export class PatchAdmService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    
    async patchAdm(id: number, updates: any) {
        try {
            const updatedAdm = await this.prismaClient.adm.update({
                where: { id },
                data: updates,
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
