import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { id, name, identityProviderId, code, type, email } = request.body;

        try {
            const newUser = await prismaClient.user.create({
                data: {
                    id,
                    name,
                    identityProviderId,
                    code,
                    type,
                    email,
                },
            });

            return response.status(201).json(newUser);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while creating the user." });
        }
    }
}
