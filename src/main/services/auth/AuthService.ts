import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from '../../utils/BcryptUtil';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface UserPayload {
    email: string;
    role: string;
}

const prismaClient = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    async login(email: any, password: string, userType: 'Professor' | 'Student' | 'Adm') {
        try {
            let user;

            if (userType === 'Professor') {
                user = await prismaClient.professor.findUnique({where: {email}});
            } else if (userType === 'Student') {
                user = await prismaClient.student.findUnique({ where: { email } });
            } else if (userType === 'Adm') {
                user = await prismaClient.adm.findUnique({ where: { email } });
            }

            if (!user) {
                return new Error('Usuário não encontrado');
            }

            const isPasswordValid = await BcryptUtils.comparePassword(password, user.password);
            if (!isPasswordValid) {
                return new Error('Credenciais inválidas');
            }

            const token = this.generateToken(user.id, userType);
            return { token };
        } catch (error) {
            console.error('Error during login:', error);
            return new Error('Erro durante o login');
        }
    }

    // Função para gerar o token JWT
    private generateToken(userId: number, role: string) {
        return jwt.sign({ id: userId, role }, JWT_SECRET, {
            expiresIn: '1h',
        });
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as UserPayload;
        if (!user || !allowedRoles.includes(user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
};