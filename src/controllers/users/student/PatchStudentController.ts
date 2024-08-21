import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class PatchStudentController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, identityProviderId, code, email } = request.body;

        try {
            const updatedUser = await prismaClient.student.update({
                where: { id: parseInt(id) },
                data: {
                    name: name || undefined,
                    identityProviderId: identityProviderId || undefined,
                    code: code || undefined,
                    email: email || undefined,
                },
            });

            return response.status(200).json(updatedUser);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while partially updating the user." });
        }
    }
}
