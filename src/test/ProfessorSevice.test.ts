import { PrismaClient } from '@prisma/client';
import { CreateProfessorService } from '../main/services/user/professor/CreateProfessorService';
import { BcryptUtils } from '../main/utils/BcryptUtil';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DeleteProfessorService } from '../main/services/user/professor/DeleteProfessorService';
import { GetProfessorByIdService } from '../main/services/user/professor/GetProfessorByIdService';
import { GetProfessorsService } from '../main/services/user/professor/GetProfessorsService';
import { PatchProfessorService } from '../main/services/user/professor/PatchProfessorService';
import { UpdateProfessorService } from '../main/services/user/professor/UpdateProfessorService';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                professor: {
                    create: jest.fn(),
                    delete: jest.fn(),
                    findUnique: jest.fn(),
                    findMany: jest.fn(),
                    update: jest.fn(),
                },
            };
        }),
    };
});

jest.mock('../main/utils/BcryptUtil', () => {
    return {
        BcryptUtils: {
            hashPassword: jest.fn(),
        },
    };
});

describe('CreateProfessorService', () => {
    let createProfessorService: CreateProfessorService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createProfessorService = new CreateProfessorService(prismaMock);
    });

    it('should create a professor successfully', async () => {
        const hashedPassword = 'hashedPassword123';
        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const professorData = {
            id: 1,
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
            password: 'password123',
        };

        const newProfessor = { ...professorData, password: hashedPassword };
        prismaMock.professor.create = jest.fn().mockResolvedValue(newProfessor);

        const result = await createProfessorService.createProfessor(professorData);

        expect(BcryptUtils.hashPassword).toHaveBeenCalledWith('password123');
        expect(prismaMock.professor.create).toHaveBeenCalledWith({
            data: {
                id: professorData.id,
                name: professorData.name,
                identityProviderId: professorData.identityProviderId,
                code: professorData.code,
                email: professorData.email,
                disciplines: {
                    connect: professorData.disciplines.map(id => ({ id })),
                },
                password: hashedPassword,
            },
        });
        expect(result).toEqual(newProfessor);
    });

    it('should return an error if the professor already exists', async () => {
        const error = new Error("Teacher already registered");
        prismaMock.professor.create = jest.fn().mockRejectedValue(error);

        const professorData = {
            id: 1,
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
            password: 'password123',
        };

        await expect(createProfessorService.createProfessor(professorData)).rejects.toThrow("Teacher already registered");
    });

    it('should handle unexpected errors', async () => {
        const error = new Error('Unexpected error');
        prismaMock.professor.create = jest.fn().mockRejectedValue(error);

        const professorData = {
            id: 1,
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
            password: 'password123',
        };

        await expect(createProfessorService.createProfessor(professorData)).rejects.toThrow('Unexpected error');
    });
});

describe('DeleteProfessorService', () => {
    let deleteProfessorService: DeleteProfessorService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        deleteProfessorService = new DeleteProfessorService(prismaMock);
    });

    it('should delete a professor successfully', async () => {
        const deletedProfessor = { id: 1, name: 'Jane Doe' };
        prismaMock.professor.delete = jest.fn().mockResolvedValue(deletedProfessor);

        const result = await deleteProfessorService.deleteProfessor(1);

        expect(prismaMock.professor.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(deletedProfessor);
    });

    it('should throw an error if professor not found', async () => {
        const error = new PrismaClientKnownRequestError('Professor not found.', { code: 'P2025', clientVersion: '' });
        prismaMock.professor.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteProfessorService.deleteProfessor(999)).rejects.toThrow("Professor not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const error = new Error('Database error');
        prismaMock.professor.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteProfessorService.deleteProfessor(1)).rejects.toThrow('Database error');
    });
});

describe('GetProfessorByIdService', () => {
    let getProfessorByIdService: GetProfessorByIdService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        getProfessorByIdService = new GetProfessorByIdService(prismaMock);
    });

    it('should return a professor when found', async () => {
        const professorData = { id: 1, name: 'Jane Doe', disciplines: [] };
        prismaMock.professor.findUnique = jest.fn().mockResolvedValue(professorData);

        const result = await getProfessorByIdService.getProfessorById(1);

        expect(prismaMock.professor.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                Question: true,
                disciplines: true,
            },
        });
        expect(result).toEqual(professorData);
    });

    it('should throw an error when the professor is not found', async () => {
        prismaMock.professor.findUnique = jest.fn().mockResolvedValue(null);

        await expect(getProfessorByIdService.getProfessorById(999)).rejects.toThrow("Professor not found.");
    });

    it('should throw a generic error for unexpected issues', async () => {
        const error = new PrismaClientKnownRequestError('Database error', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.professor.findUnique = jest.fn().mockRejectedValue(error);

        await expect(getProfessorByIdService.getProfessorById(1)).rejects.toThrow('Professor not found.');
    });
});

describe('GetProfessorsService', () => {
    let getProfessorsService: GetProfessorsService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        getProfessorsService = new GetProfessorsService(prismaMock);
    });

    it('should return all professors successfully', async () => {
        const professorsData = [
            { id: 1, name: 'Jane Doe', disciplines: [] },
            { id: 2, name: 'John Smith', disciplines: [] },
        ];

        prismaMock.professor.findMany = jest.fn().mockResolvedValue(professorsData);

        const result = await getProfessorsService.getAllProfessors();

        expect(prismaMock.professor.findMany).toHaveBeenCalledWith({
            include: {
                Question: true,
                disciplines: true,
            },
        });
        expect(result).toEqual(professorsData);
    });

    it('should handle errors when fetching professors', async () => {
        const error = new Error('Database error');
        prismaMock.professor.findMany = jest.fn().mockRejectedValue(error);

        await expect(getProfessorsService.getAllProfessors()).rejects.toThrow('Database error');
    });

    it('should handle unexpected errors', async () => {
        const error = new PrismaClientKnownRequestError('Unexpected error', {
            code: 'P2000',
            clientVersion: '',
        });
        prismaMock.professor.findMany = jest.fn().mockRejectedValue(error);

        await expect(getProfessorsService.getAllProfessors()).rejects.toThrow('Unexpected error');
    });
});

describe('PatchProfessorService', () => {
    let patchProfessorService: PatchProfessorService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        patchProfessorService = new PatchProfessorService(prismaMock);
    });

    it('should update a professor successfully', async () => {
        const updatedProfessorData = {
            id: 1,
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [],
        };

        prismaMock.professor.update = jest.fn().mockResolvedValue(updatedProfessorData);

        const updates = {
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
        };

        const result = await patchProfessorService.patchProfessor(1, updates);

        expect(prismaMock.professor.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                ...updates,
                disciplines: {
                    set: updates.disciplines.map(id => ({ id })),
                },
            },
            include: {
                disciplines: true,
            },
        });
        expect(result).toEqual(updatedProfessorData);
    });

    it('should throw an error if the professor is not found', async () => {
        const error = new PrismaClientKnownRequestError('Professor not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.professor.update = jest.fn().mockRejectedValue(error);

        const updates = {
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
        };

        await expect(patchProfessorService.patchProfessor(999, updates)).rejects.toThrow("Professor not found.");
    });

    it('should handle unexpected errors', async () => {
        const error = new Error('Database error');
        prismaMock.professor.update = jest.fn().mockRejectedValue(error);

        const updates = {
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
        };

        await expect(patchProfessorService.patchProfessor(1, updates)).rejects.toThrow('Database error');
    });
});

describe('UpdateProfessorService', () => {
    let updateProfessorService: UpdateProfessorService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        updateProfessorService = new UpdateProfessorService(prismaMock);
    });

    it('should update a professor successfully', async () => {
        const hashedPassword = 'hashedPassword123';
        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const updatedProfessorData = {
            id: 1,
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [],
        };

        prismaMock.professor.update = jest.fn().mockResolvedValue(updatedProfessorData);

        const data = {
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
            password: 'password123',
        };

        const result = await updateProfessorService.updateProfessor(1, data);

        expect(BcryptUtils.hashPassword).toHaveBeenCalledWith('password123');
        expect(prismaMock.professor.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                name: data.name,
                identityProviderId: data.identityProviderId,
                code: data.code,
                email: data.email,
                disciplines: {
                    connect: data.disciplines.map(id => ({ id })),
                },
            },
        });
        expect(result).toEqual(updatedProfessorData);
    });

    it('should throw an error if the professor is not found', async () => {
        const error = new PrismaClientKnownRequestError('Professor not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.professor.update = jest.fn().mockRejectedValue(error);

        const data = {
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
            password: 'password123',
        };

        await expect(updateProfessorService.updateProfessor(999, data)).rejects.toThrow("Professor not found.");
    });

    it('should handle unexpected errors', async () => {
        const error = new Error('Database error');
        prismaMock.professor.update = jest.fn().mockRejectedValue(error);

        const data = {
            name: 'Jane Doe',
            identityProviderId: 'id-123',
            code: 'PROF001',
            email: 'jane@example.com',
            disciplines: [1, 2],
            password: 'password123',
        };

        await expect(updateProfessorService.updateProfessor(1, data)).rejects.toThrow('Database error');
    });
});