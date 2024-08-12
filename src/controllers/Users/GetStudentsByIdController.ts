import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export class GetStudentsByIdController {
    async handle(request: Request, response: Response){
        const { id } = request.params

        try {
            const student = await prismaClient.user.findUnique({
                where: { id: Number(id), type: 'Aluno' },
                include: {
                    questions: true
                }
            })

            if (!student) {
                return response.status(404).json({ error: "Student not found." })
            }

            return response.status(200).json(student)
        } catch (error) {
            return response.status(500).json({ error: "An error occurred while fetching the student." })
        }
    }
}
