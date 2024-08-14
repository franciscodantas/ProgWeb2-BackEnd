import { Request, Response } from 'express';
import { CreateAdmService } from '../../services/adm/CreateAdmService';

export class CreateAdmController {
    private admService: CreateAdmService;

    constructor() {
        this.admService = new CreateAdmService();
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;

        try {
            const newAdm = await this.admService.createAdm(name, email);

            if (newAdm instanceof Error) {
                return response.status(400).json({ error: "An error occurred while creating the adm.", info: newAdm });
            }

            return response.status(201).json(newAdm);
        } catch (error) {
            if (error instanceof Error){
                return response.status(500).json({ error: "An unexpected error occurred.", info: error.message, stackTrace: error.stack});
            }
            return response.status(500).json({ error: "An unexpected error occurred.", info: error});
        }
    }
}
