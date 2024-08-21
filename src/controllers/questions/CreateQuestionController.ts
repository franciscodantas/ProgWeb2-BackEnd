import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateQuestionController {

    async handle(request: Request, response: Response) {
        const { title, content, answer, image, professorId, studentId, disciplineId } = request.body;

        try {
          const base64Image = image.trim();

          const imageBuffer = Buffer.from(base64Image, 'base64');
      
          const question = await prismaClient.question.create({
            data: {
              title,
              content,
              answer,
              image: imageBuffer,
              professorId,
              studentId,
              disciplineId,
            },
          });
      
          return response.status(200).json(question);
        } catch (error) {
          console.error('Error creating question:', error);
          return response.status(500).json({ error: "An error occurred while fetching the discipline." });
        }
    }
}
