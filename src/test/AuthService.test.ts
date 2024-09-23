import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeAuthorOrAdmin, authorizeQuestionCreation, authorizeRoles, authorizeSelfUpdate, AuthService } from '../main/services/auth/AuthService';
import { BcryptUtils } from '../main/utils/BcryptUtil';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                professor: {
                    findUnique: jest.fn(),
                },
                student: {
                    findUnique: jest.fn(),
                },
                adm: {
                    findUnique: jest.fn(),
                },
                question: {
                    findUnique: jest.fn(),
                    create: jest.fn(),
                },
            };
        }),
    };
});

jest.mock('../main/utils/BcryptUtil', () => {
    return {
        BcryptUtils: {
            comparePassword: jest.fn(),
        },
    };
});

jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn(),
        verify: jest.fn(),
    };
});

describe('AuthService', () => {
    let authService: AuthService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        authService = new AuthService(prismaMock);
    });

    it('should log in a student successfully', async () => {
        const userData = { id: 1, email: 'john@example.com', password: 'hashedPassword' };
        prismaMock.student.findUnique = jest.fn().mockResolvedValue(userData);
        (BcryptUtils.comparePassword as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('fakeToken');

        const result = await authService.login('john@example.com', 'password123', 'Student');

        expect(prismaMock.student.findUnique).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
        expect(BcryptUtils.comparePassword).toHaveBeenCalledWith('password123', userData.password);
        expect(result).toEqual({ token: 'fakeToken' });
    });

    it('should return an error if user not found', async () => {
        prismaMock.student.findUnique = jest.fn().mockResolvedValue(null);

        const result = await authService.login('john@example.com', 'password123', 'Student');

        expect(result).toEqual(new Error('Usuário não encontrado'));
    });

    it('should return an error if password is invalid', async () => {
        const userData = { id: 1, email: 'john@example.com', password: 'hashedPassword' };
        prismaMock.student.findUnique = jest.fn().mockResolvedValue(userData);
        (BcryptUtils.comparePassword as jest.Mock).mockResolvedValue(false);

        const result = await authService.login('john@example.com', 'wrongPassword', 'Student');

        expect(result).toEqual(new Error('Credenciais inválidas'));
    });

    it('should throw an error during login', async () => {
        prismaMock.student.findUnique = jest.fn().mockImplementation(() => {
            throw new Error('Database error');
        });

        const result = await authService.login('john@example.com', 'password123', 'Student');

        expect(result).toEqual(new Error('Erro durante o login'));
    });

    it('should generate a JWT token', () => {
        const token = authService['generateToken'](1, 'Student');
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1, role: 'Student' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        expect(token).toEqual(expect.any(String));
    });
});

describe('Middleware functions', () => {
    let prisma: PrismaClient;

    beforeEach(() => {
        prisma = new PrismaClient();
    });

    it('should authenticate token successfully', () => {
        const req = { headers: { authorization: 'Bearer fakeToken' } };
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();

        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(null, { id: 1, role: 'Student' });
        });

        authenticateToken(req as any, res as any, next);
        
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if token is missing', () => {
        const req = { headers: {} };
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();

        authenticateToken(req as any, res as any, next);

        expect(res.sendStatus).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if token is invalid', () => {
        const req = { headers: { authorization: 'Bearer fakeToken' } };
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();

        (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
            callback(new Error('Token invalid'), null);
        });

        authenticateToken(req as any, res as any, next);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    it('should authorize roles successfully', () => {
        const req = { user: { role: 'Student' } };
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();

        authorizeRoles('Student')(req as any, res as any, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user role is not authorized', () => {
        const req = { user: { role: 'Professor' } };
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();

        authorizeRoles('Student')(req as any, res as any, next);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });
    describe('authorizeSelfUpdate', () => {
        it('should allow user to update their own information', () => {
            const req = { user: { id: '1' }, params: { id: '1' } };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeSelfUpdate()(req as any, res as any, next);

            expect(next).toHaveBeenCalled();
        });

        it('should return 403 if user tries to update another user', () => {
            const req = { user: { id: '1' }, params: { id: '2' } };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeSelfUpdate()(req as any, res as any, next);

            expect(res.sendStatus).toHaveBeenCalledWith(403);
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 403 if user is not authenticated', () => {
            const req = { user: null, params: { id: '1' } };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeSelfUpdate()(req as any, res as any, next);

            expect(res.sendStatus).toHaveBeenCalledWith(403);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('authorizeAuthorOrAdmin', () => {
        it('should allow admin to proceed', async () => {
            const req = { user: { role: 'Adm' }, params: { id: '1' } };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            await authorizeAuthorOrAdmin(req as any, res as any, next);

            expect(next).toHaveBeenCalled();
        });
        
        it('should return 404 if question does not exist', async () => {
            const req = { user: { role: 'Student' }, params: { id: '999' } };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            jest.spyOn(prisma.question, 'findUnique').mockResolvedValue(null);

            await authorizeAuthorOrAdmin(req as any, res as any, next);

            expect(res.sendStatus).toHaveBeenCalledWith(404);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('authorizeQuestionCreation', () => {
        it('should allow user to create question with their ID', () => {
            const req = {
                user: { id: '1' },
                body: { studentId: '1' }
            };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeQuestionCreation(req as any, res as any, next);

            expect(next).toHaveBeenCalled();
        });

        it('should allow user to create question with professor ID', () => {
            const req = {
                user: { id: '1' },
                body: { professorId: '1' }
            };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeQuestionCreation(req as any, res as any, next);

            expect(next).toHaveBeenCalled();
        });

        it('should return 403 if user ID does not match', () => {
            const req = {
                user: { id: '1' },
                body: { studentId: '2' }
            };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeQuestionCreation(req as any, res as any, next);

            expect(res.sendStatus).toHaveBeenCalledWith(403);
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 403 if neither studentId nor professorId match', () => {
            const req = {
                user: { id: '1' },
                body: {}
            };
            const res = { sendStatus: jest.fn() };
            const next = jest.fn();

            authorizeQuestionCreation(req as any, res as any, next);

            expect(res.sendStatus).toHaveBeenCalledWith(403);
            expect(next).not.toHaveBeenCalled();
        });
    });
});
