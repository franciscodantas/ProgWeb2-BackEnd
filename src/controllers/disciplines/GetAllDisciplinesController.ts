import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GetAllDisciplineService } from '../../services/discipline/GetAllDisciplineService';

const prismaClient = new PrismaClient();

export class GetAllDisciplinesController {
    async handle(request: Request, response: Response) {
        try {
            const getAllDisciplineService = new GetAllDisciplineService();
            const disciplines = await getAllDisciplineService.getAll();
            return response.status(200).json(disciplines);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching disciplines." });
        }
    }
}
