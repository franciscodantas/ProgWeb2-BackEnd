import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PaginationValidation } from '../../validation/PaginationValidation';
import { GetAllQuestionsService } from '../../services/question/GetAllQuestionsService';

const prismaClient = new PrismaClient()

export class GetQuestionsController {
    async handle(request: Request, response: Response){
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 20;
        const sortBy = request.query.sortBy ? String(request.query.sortBy) : 'createdAt';
        const order = request.query.order === 'desc' ? 'desc' : 'asc';


        const { error } = PaginationValidation.validate({ page, limit });

        if (error) {
            return response.status(400).json({ errors: error });
        }
        
        try {
            const getAllQuestionsService = new GetAllQuestionsService();
            const questions = await getAllQuestionsService.getAll(page, limit, sortBy, order);
            return response.status(200).json(questions)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching questions." })
        }
    }
}
