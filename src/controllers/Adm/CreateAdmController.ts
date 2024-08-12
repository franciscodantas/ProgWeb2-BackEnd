import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateAdmController {
    async handle(request: Request, response: Response) {
        const { id, name, email } = request.body;

        try {
            const newAdm = await prismaClient.adm.create({
                data: {
                    id,
                    name,
                    email,
                },
            });
            return response.status(201).json(newAdm);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while creating the adm." });
        }
    }
}
