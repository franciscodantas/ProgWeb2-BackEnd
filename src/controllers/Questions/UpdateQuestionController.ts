import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class UpdateQuestionController {
    async handle(request: Request, response: Response){
        const { id } = request.params
        const { title, content, answer, image, authorId, disciplineId } = request.body

        try {
            const updatedQuestion = await prismaClient.question.update({
                where: { id: Number(id) },
                data: {
                    title,
                    content,
                    answer,
                    image,
                    authorId,
                    disciplineId
                }
            })

            return response.status(200).json(updatedQuestion)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while updating the question." })
        }
    }
}
