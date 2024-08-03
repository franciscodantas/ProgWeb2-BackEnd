import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class CreateQuestionController {

    async handle(request: Request, response: Response) {
        const { title, content, answer, image, authorId, disciplineId } = request.body;

        try {
          const base64Image = image.trim();

          const imageBuffer = Buffer.from(base64Image, 'base64');
      
          const question = await prismaClient.question.create({
            data: {
              title,
              content,
              answer,
              image: imageBuffer,
              authorId,
              disciplineId,
            },
          });
      
          return question;
        } catch (error) {
          console.error('Error creating question:', error);
          throw error;
        }
    }
}
