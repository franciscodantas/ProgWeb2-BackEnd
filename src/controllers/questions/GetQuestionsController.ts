import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { GetAllQuestionsService } from '../../services/questionn/GetAllQuestionsService'

const prismaClient = new PrismaClient()

export class GetQuestionsController {
    async handle(request: Request, response: Response){
        try {
            const getAllQuestionsService = new GetAllQuestionsService();
            const questions = await getAllQuestionsService.getAll();
            return response.status(200).json(questions)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching questions." })
        }
    }
}
