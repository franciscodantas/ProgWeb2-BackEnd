import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRoles, AuthService } from '../main/services/auth/AuthService';
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
});
