import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/AuthService';

export class AuthController {
    async loginProfessor(request: Request, response: Response) {
        const { email, password } = request.body;

        const authService = new AuthService();
        try {
            const result = await authService.login(email, password, 'Professor');
            if (result instanceof Error) {
                return response.status(400).json({ error: result.message });
            }
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    async loginStudent(request: Request, response: Response) {
        const { email, password } = request.body;

        const authService = new AuthService();
        try {
            const result = await authService.login(email, password, 'Student');
            if (result instanceof Error) {
                return response.status(400).json({ error: result.message });
            }
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    async loginAdm(request: Request, response: Response) {
        const { email, password } = request.body;

        const authService = new AuthService();
        try {
            const result = await authService.login(email, password, 'Adm');
            if (result instanceof Error) {
                return response.status(400).json({ error: result.message });
            }
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }

    async getProfile(request: Request, response: Response) {
        try {
            console.log(request.user);
            const user = request.user;
            return response.status(200).json({ profile: user });
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}
