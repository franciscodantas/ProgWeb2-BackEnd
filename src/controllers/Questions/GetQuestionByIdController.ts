import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetQuestionByIdController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            const question = await prismaClient.question.findUnique({
                where: { id: Number(id) },
                include: {
                    author: true,
                    discipline: true
                }
            })

            if (!question) {
                return response.status(404).json({ error: "Question not found." })
            }

            return response.status(200).json(question)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the question." })
        }
    }
}
