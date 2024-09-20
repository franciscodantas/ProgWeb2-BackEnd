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
    id: string;
    email: string;
    role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async login(email: any, password: string, userType: 'Professor' | 'Student' | 'Adm') {
        try {
            let user;

            if (userType === 'Professor') {
                user = await this.prismaClient.professor.findUnique({where: {email}});
            } else if (userType === 'Student') {
                user = await this.prismaClient.student.findUnique({ where: { email } });
            } else if (userType === 'Adm') {
                user = await this.prismaClient.adm.findUnique({ where: { email } });
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
        console.log(user)
        if (!user || !allowedRoles.includes(user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
};

export const authorizeSelfUpdate = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as UserPayload;
        const userIdFromParams = req.params.id;
        console.log(user)
        console.log(userIdFromParams)
        console.log(!user || user.id != userIdFromParams)
        if (!user || user.id != userIdFromParams) {
            return res.sendStatus(403);
        }
        next();
    };
};

export const authorizeAuthorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserPayload;
    const questionId = req.params.id;
    const prisma = new PrismaClient();

    if (user.role === 'Adm') {
        return next();
    }

    try {
        const question = await prisma.question.findUnique({
            where: { id: Number(questionId) },
            select: { studentId: true, professorId: true },
        });

        if (!question) {
            return res.sendStatus(404);
        }

        const userId = Number(user.id);

        if ((question.studentId != null && question.studentId == userId) ||
            (question.professorId != null && question.professorId == userId)) {
            return next();
        }

        return res.sendStatus(403);
    } catch (error) {
        console.error('Error fetching question:', error);
        return res.sendStatus(500);
    }
};

export const authorizeQuestionCreation = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserPayload;
    const { studentId, professorId } = req.body;

    if (
        (studentId && Number(studentId) == Number(user.id)) ||
        (professorId && Number(professorId) == Number(user.id))
    ) {
        return next();
    }

    return res.sendStatus(403);
};