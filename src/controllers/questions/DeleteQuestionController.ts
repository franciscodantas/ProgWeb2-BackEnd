import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class DeleteQuestionController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            await prismaClient.question.delete({
                where: { id: Number(id) }
            })

            return response.status(204).send()
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while deleting the question." })
        }
    }
}