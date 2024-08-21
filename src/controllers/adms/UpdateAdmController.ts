import { Request, Response } from 'express';
import { UpdateAdmService } from '../../services/adm/UpdateAdmService';

export class UpdateAdmController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email } = request.body;

        try {
            const admService = new UpdateAdmService();
            const updatedAdm = await admService.updateAdm(parseInt(id), name, email);

            if (updatedAdm instanceof Error) {
                return response.status(404).json({ error: updatedAdm.message });
            }

            return response.status(200).json(updatedAdm);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
