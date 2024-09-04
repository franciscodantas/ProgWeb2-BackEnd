import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GetAllDisciplineService } from '../../services/discipline/GetAllDisciplineService';
import { PaginationValidation } from '../../validation/PaginationValidation';

const prismaClient = new PrismaClient();

export class GetAllDisciplinesController {
    async handle(request: Request, response: Response) {
        const { page = 1, limit = 20 } = request.query;
        const { error, value } = PaginationValidation.validate({ page, limit });

        if (error) {
            return response.status(400).json({ errors: error });
        }

        const pageNumber = value.page;
        const limitNumber = value.limit;

        try {
            const getAllDisciplineService = new GetAllDisciplineService();
            const disciplines = await getAllDisciplineService.getAll(pageNumber, limitNumber);
            return response.status(200).json(disciplines);
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching disciplines." });
        }
    }
}
