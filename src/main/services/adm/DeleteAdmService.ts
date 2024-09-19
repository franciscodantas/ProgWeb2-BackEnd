import { PrismaClient} from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


export class DeleteAdmService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async delete(id: number) {
        try {
            const deletedAdm = await this.prismaClient.adm.delete({
                where: { id }
            });
            return deletedAdm;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error("Adm not found.");
            }
            console.error('Error deleting ADM:', error);
            throw error; 
        }
    }
}
