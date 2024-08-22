import { Request, Response } from 'express';
import { GetProfessorsService } from '../../../services/user/professor/GetProfessorsService';

export class GetProfessorsController {
    async handle(request: Request, response: Response) {
        try {
            const getProfessorsService = new GetProfessorsService();
            const professors = await getProfessorsService.getAllProfessors();

            return response.status(200).json(professors);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack,
                });
            }
        }
    }
}
