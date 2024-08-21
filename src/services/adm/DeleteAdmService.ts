import { PrismaClient} from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaClient = new PrismaClient();

export class DeleteAdmService {
    async delete(id: number) {
        try {
            const deletedAdm = await prismaClient.adm.delete({
                where: { id }
            });
            return deletedAdm;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Adm not found.");
            }
            console.error('Error deleting ADM:', error);
            throw error; 
        }
    }
}
