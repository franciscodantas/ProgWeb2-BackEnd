import { Request, Response } from 'express';
import { GetAdminByIdService } from '../../services/adm/GetAdminByIdService';

export class GetAdminByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const adminService = new GetAdminByIdService();
            const admin = await adminService.getAdminById(Number(id));

            return response.status(200).json(admin);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Adm not found.") {
                    return response.status(404).json({ error: error.message });
                }
                return response.status(500).json({
                    error: "An unexpected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
