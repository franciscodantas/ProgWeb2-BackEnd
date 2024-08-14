import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class PatchAdmController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const updates = request.body;

        try {
            const updatedAdm = await prismaClient.adm.update({
                where: { id: parseInt(id) },
                data: updates,
            });
            return response.status(200).json(updatedAdm);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while partially updating the adm." });
        }
    }
}
