import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class DeleteAdmService {
    async delete(id: any) {
        try {
            const deletedAdm = await prismaClient.adm.findUnique({
                where: {id: parseInt(id)}
            })

            if (deletedAdm == null) {
                
                return null;
            }
            await prismaClient.adm.delete({
                where: { id: parseInt(id) },
            });
            
            return deletedAdm;
        } catch (error) {
            return error;
        }
    }
}