import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PaginationValidation } from '../../validation/PaginationValidation';
import { GetAllDisciplineService } from '../../services/discipline/GetAllDisciplineService';

const prismaClient = new PrismaClient();

export class GetAllDisciplinesController {
    async handle(request: Request, response: Response) {
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 20;
        const { error } = PaginationValidation.validate({ page, limit });

        if (error) {
            return response.status(400).json({ errors: error });
        }

        try {
            const getAllDisciplineService = new GetAllDisciplineService();
            const disciplines = await getAllDisciplineService.getAll(page, limit);
            return response.status(200).json(disciplines);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching disciplines." });
        }
    }
}
