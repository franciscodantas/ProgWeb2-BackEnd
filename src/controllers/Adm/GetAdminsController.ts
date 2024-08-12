import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class GetAdminsController {
    async handle(request: Request, response: Response) {
        try {
            const admins = await prismaClient.adm.findMany({});
            return response.status(200).json(admins);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching admins." });
        }
    }
}
