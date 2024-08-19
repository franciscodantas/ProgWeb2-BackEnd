import { Request, Response } from 'express';
import { GetAdminByIdService } from '../../services/adm/GetAdminByIdService';

export class GetAdminByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const adminService = new GetAdminByIdService();
            const admin = await adminService.getAdminById(Number(id));

            if (admin instanceof Error) {
                return response.status(404).json({ error: admin.message });
            }

            return response.status(200).json(admin);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ error: "An unexpected error occurred.", info: error.message, stackTrace: error.stack });
            }
        }
    }
}
