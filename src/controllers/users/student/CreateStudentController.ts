import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateStudentController {
    async handle(request: Request, response: Response) {
        const { id, name, identityProviderId, code, email } = request.body;

        try {
            const newUser = await prismaClient.student.create({
                data: {
                    id,
                    name,
                    identityProviderId,
                    code,
                    email,
                },
            });

            return response.status(201).json(newUser);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while creating the user." });
        }
    }
}
