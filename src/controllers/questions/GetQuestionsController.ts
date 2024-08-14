import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetQuestionsController {
    async handle(request: Request, response: Response){
        try {
            const questions = await prismaClient.question.findMany({
                include: {
                    author: true,
                    discipline: true
                }
            })
            return response.status(200).json(questions)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching questions." })
        }
    }
}
