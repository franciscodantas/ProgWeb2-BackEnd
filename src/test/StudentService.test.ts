import { PrismaClient } from '@prisma/client';
import { CreateStudentService } from '../main/services/user/student/CreateStudentService';
import { BcryptUtils } from '../main/utils/BcryptUtil';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DeleteStudentService } from '../main/services/user/student/DeleteStudentService';
import { GetStudentByIdService } from '../main/services/user/student/GetStudentByIdService';
import { GetStudentService } from '../main/services/user/student/GetStudentService';
import { PatchStudentService } from '../main/services/user/student/PatchStudentService';
import { UpdateStudentService } from '../main/services/user/student/UpdateStudentService';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                student: {
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

describe('CreateStudentService', () => {
    let createStudentService: CreateStudentService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createStudentService = new CreateStudentService(prismaMock);
    });

    it('should create a student successfully', async () => {
        const hashedPassword = 'hashedPassword123';
        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const studentData = {
            id: 1,
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };

        const newStudent = { ...studentData, password: hashedPassword };
        prismaMock.student.create = jest.fn().mockResolvedValue(newStudent);

        const result = await createStudentService.createStudent(studentData);

        expect(BcryptUtils.hashPassword).toHaveBeenCalledWith('password123');
        expect(prismaMock.student.create).toHaveBeenCalledWith({
            data: {
                id: studentData.id,
                name: studentData.name,
                identityProviderId: studentData.identityProviderId,
                code: studentData.code,
                email: studentData.email,
                password: hashedPassword,
            },
        });
        expect(result).toEqual(newStudent);
    });

    it('should throw an error if the student already exists', async () => {
        const error = new Error("Student already registered");
        prismaMock.student.create = jest.fn().mockRejectedValue(error);

        const studentData = {
            id: 1,
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };

        const result = await createStudentService.createStudent(studentData);
        
        expect(result).toEqual(error);
    });

    it('should handle unexpected errors', async () => {
        const error = new Error('Unexpected error');
        prismaMock.student.create = jest.fn().mockRejectedValue(error);

        const studentData = {
            id: 1,
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };

        const result = await createStudentService.createStudent(studentData);
        
        expect(result).toEqual(error);
    });
});

describe('DeleteStudentService', () => {
    let deleteStudentService: DeleteStudentService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        deleteStudentService = new DeleteStudentService(prismaMock);
    });

    it('should delete a student successfully', async () => {
        const deletedStudent = { id: 1, name: 'John Doe' };
        prismaMock.student.delete = jest.fn().mockResolvedValue(deletedStudent);

        const result = await deleteStudentService.deleteStudent(1);

        expect(prismaMock.student.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(deletedStudent);
    });

    it('should throw an error if the student is not found', async () => {
        const error = new PrismaClientKnownRequestError('Student not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.student.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteStudentService.deleteStudent(999)).rejects.toThrow("Student not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const error = new Error('Database error');
        prismaMock.student.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteStudentService.deleteStudent(1)).rejects.toThrow('Database error');
    });
});

describe('GetStudentByIdService', () => {
    let getStudentByIdService: GetStudentByIdService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        getStudentByIdService = new GetStudentByIdService(prismaMock);
    });

    it('should return a student when found', async () => {
        const studentData = { id: 1, name: 'John Doe', Question: [] };
        prismaMock.student.findUnique = jest.fn().mockResolvedValue(studentData);

        const result = await getStudentByIdService.getStudentById(1);

        expect(prismaMock.student.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                Question: true,
            },
        });
        expect(result).toEqual(studentData);
    });

    it('should throw an error when the student is not found', async () => {
        prismaMock.student.findUnique = jest.fn().mockResolvedValue(null);

        await expect(getStudentByIdService.getStudentById(999)).rejects.toThrow("Student not found.");
    });

    it('should throw a generic error for unexpected issues', async () => {
        const error = new PrismaClientKnownRequestError('Database error', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.student.findUnique = jest.fn().mockRejectedValue(error);

        await expect(getStudentByIdService.getStudentById(1)).rejects.toThrow('Student not found.');
    });
});

describe('GetStudentService', () => {
    let getStudentService: GetStudentService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        getStudentService = new GetStudentService(prismaMock);
    });

    it('should return all students successfully', async () => {
        const studentsData = [
            { id: 1, name: 'John Doe', Question: [] },
            { id: 2, name: 'Jane Smith', Question: [] },
        ];

        prismaMock.student.findMany = jest.fn().mockResolvedValue(studentsData);

        const result = await getStudentService.getAllStudent();

        expect(prismaMock.student.findMany).toHaveBeenCalledWith({
            include: {
                Question: true,
            },
        });
        expect(result).toEqual(studentsData);
    });

    it('should throw an error if there is an issue fetching students', async () => {
        const error = new Error('Database error');
        prismaMock.student.findMany = jest.fn().mockRejectedValue(error);

        await expect(getStudentService.getAllStudent()).rejects.toThrow('Database error');
    });

    it('should log an error message when fetching students fails', async () => {
        const error = new Error('Database error');
        prismaMock.student.findMany = jest.fn().mockRejectedValue(error);
        console.error = jest.fn();

        await expect(getStudentService.getAllStudent()).rejects.toThrow('Database error');
        expect(console.error).toHaveBeenCalledWith('Error fetching students:', error);
    });
});

describe('PatchStudentService', () => {
    let patchStudentService: PatchStudentService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        patchStudentService = new PatchStudentService(prismaMock);
    });

    it('should update a student successfully', async () => {
        const studentId = 1;
        const studentData = { name: 'John Doe', email: 'john@example.com' };
        const updatedStudent = { id: studentId, ...studentData, Question: [] };

        prismaMock.student.update = jest.fn().mockResolvedValue(updatedStudent);

        const result = await patchStudentService.patchStudent(studentId, studentData);

        expect(prismaMock.student.update).toHaveBeenCalledWith({
            where: { id: studentId },
            data: studentData,
            include: {
                Question: true,
            },
        });
        expect(result).toEqual(updatedStudent);
    });

    it('should throw an error if the student is not found', async () => {
        const studentId = 999;
        const studentData = { name: 'John Doe' };

        const error = new PrismaClientKnownRequestError('Student not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.student.update = jest.fn().mockRejectedValue(error);

        await expect(patchStudentService.patchStudent(studentId, studentData)).rejects.toThrow("Student not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const studentId = 1;
        const studentData = { name: 'John Doe' };
        const error = new Error('Database error');

        prismaMock.student.update = jest.fn().mockRejectedValue(error);

        await expect(patchStudentService.patchStudent(studentId, studentData)).rejects.toThrow('Database error');
    });

    it('should log an error message when updating a student fails', async () => {
        const studentId = 1;
        const studentData = { name: 'John Doe' };
        const error = new Error('Database error');

        prismaMock.student.update = jest.fn().mockRejectedValue(error);

        await expect(patchStudentService.patchStudent(studentId, studentData)).rejects.toThrow('Database error');
        expect(console.error).toHaveBeenCalledWith('Error updating Student:', error);
    });
});

describe('UpdateStudentService', () => {
    let updateStudentService: UpdateStudentService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        updateStudentService = new UpdateStudentService(prismaMock);
    });

    it('should update a student successfully', async () => {
        const studentId = 1;
        const studentData = {
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };

        const hashedPassword = 'hashedPassword123';
        const updatedStudent = { id: studentId, ...studentData, password: hashedPassword };

        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
        prismaMock.student.update = jest.fn().mockResolvedValue(updatedStudent);

        const result = await updateStudentService.updateStudent(studentId, studentData);

        expect(BcryptUtils.hashPassword).toHaveBeenCalledWith(studentData.password);
        expect(prismaMock.student.update).toHaveBeenCalledWith({
            where: { id: studentId },
            data: {
                name: studentData.name,
                identityProviderId: studentData.identityProviderId,
                code: studentData.code,
                email: studentData.email,
                password: hashedPassword,
            },
        });
        expect(result).toEqual(updatedStudent);
    });

    it('should throw an error if the student is not found', async () => {
        const studentId = 999;
        const studentData = {
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };

        const error = new PrismaClientKnownRequestError('Student not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.student.update = jest.fn().mockRejectedValue(error);

        await expect(updateStudentService.updateStudent(studentId, studentData)).rejects.toThrow("Student not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const studentId = 1;
        const studentData = {
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };
        const error = new Error('Database error');

        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
        prismaMock.student.update = jest.fn().mockRejectedValue(error);

        await expect(updateStudentService.updateStudent(studentId, studentData)).rejects.toThrow('Database error');
    });

    it('should log an error message when updating a student fails', async () => {
        const studentId = 1;
        const studentData = {
            name: 'John Doe',
            identityProviderId: 'id-456',
            code: 'STU001',
            email: 'john@example.com',
            password: 'password123',
        };
        const error = new Error('Database error');

        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
        prismaMock.student.update = jest.fn().mockRejectedValue(error);

        await expect(updateStudentService.updateStudent(studentId, studentData)).rejects.toThrow('Database error');
        expect(console.error).toHaveBeenCalledWith('Error updating student:', error);
    });
});