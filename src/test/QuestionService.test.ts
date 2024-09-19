import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateQuestionService } from '../main/services/question/CreateQuestionService';
import { DeleteQuestionService } from '../main/services/question/DeleteQuestionService';
import { GetAllQuestionsService } from '../main/services/question/GetAllQuestionsService';
import { GetQuestionByIdService } from '../main/services/question/GetQuestionByIdService';
import { PatchQuestionService } from '../main/services/question/PatchQuestionService';
import { UpdateQuestionService } from '../main/services/question/UpdateQuestionService';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                discipline: {
                    findUnique: jest.fn(),
                },
                question: {
                    create: jest.fn(),
                    delete: jest.fn(),
                    findUnique: jest.fn(),
                    findMany: jest.fn(),
                    update: jest.fn(),
                },
                student: {
                    findUnique: jest.fn(),
                },
                professor: {
                    findUnique: jest.fn(),
                },
            };
        }),
    };
});

describe('CreateQuestionService', () => {
    let createQuestionService: CreateQuestionService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createQuestionService = new CreateQuestionService(prismaMock);
    });

    const disciplineId = 1;
    const base64Image = 'imageInBase64';
    const questionData = {
        title: 'What is computer science?',
        content: 'An introduction to computer science.',
        answer: 'It is the study of computers and computational systems.',
        image: base64Image,
        professorId: 1,
        disciplineId: disciplineId,
    };

    it('should create a question successfully', async () => {
        prismaMock.discipline.findUnique = jest.fn().mockResolvedValue({ id: disciplineId });
        prismaMock.question.findUnique = jest.fn().mockResolvedValue(null);
        prismaMock.professor.findUnique = jest.fn().mockResolvedValue({ id: 1 });

        const newQuestion = { id: 1, ...questionData, image: Buffer.from(base64Image, 'base64') };
        prismaMock.question.create = jest.fn().mockResolvedValue(newQuestion);

        const result = await createQuestionService.createQuestion(questionData);

        expect(prismaMock.discipline.findUnique).toHaveBeenCalledWith({ where: { id: disciplineId } });
        expect(prismaMock.question.findUnique).toHaveBeenCalledWith({ where: { title: questionData.title } });
        expect(prismaMock.professor.findUnique).toHaveBeenCalledWith({ where: { id: questionData.professorId } });
        expect(prismaMock.question.create).toHaveBeenCalledWith({
            data: {
                title: questionData.title,
                content: questionData.content,
                answer: questionData.answer,
                image: Buffer.from(base64Image, 'base64'),
                professorId: questionData.professorId,
                disciplineId: questionData.disciplineId,
            },
        });
        expect(result).toEqual(newQuestion);
    });

    it('should throw an error if the discipline is not found', async () => {
        prismaMock.discipline.findUnique = jest.fn().mockResolvedValue(null);

        await expect(createQuestionService.createQuestion(questionData)).rejects.toThrow("Discipline not found.");
    });

    it('should throw an error if the question with the same title already exists', async () => {
        prismaMock.discipline.findUnique = jest.fn().mockResolvedValue({ id: disciplineId });
        prismaMock.question.findUnique = jest.fn().mockResolvedValue({ id: 1 });

        await expect(createQuestionService.createQuestion(questionData)).rejects.toThrow("Question with the same title already exists.");
    });

    it('should throw an error if the professor is not found', async () => {
        prismaMock.discipline.findUnique = jest.fn().mockResolvedValue({ id: disciplineId });
        prismaMock.question.findUnique = jest.fn().mockResolvedValue(null);
        prismaMock.professor.findUnique = jest.fn().mockResolvedValue(null);

        await expect(createQuestionService.createQuestion(questionData)).rejects.toThrow("Author not found.");
    });
});
describe('DeleteQuestionService', () => {
    let deleteQuestionService: DeleteQuestionService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        deleteQuestionService = new DeleteQuestionService(prismaMock);
    });

    it('should delete a question successfully', async () => {
        const deletedQuestion = { id: 1, title: 'What is computer science?' };
        prismaMock.question.delete = jest.fn().mockResolvedValue(deletedQuestion);

        const result = await deleteQuestionService.deleteQuestion(1);

        expect(prismaMock.question.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(deletedQuestion);
    });

    it('should throw an error if the question is not found', async () => {
        const error = new PrismaClientKnownRequestError('Question not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.question.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteQuestionService.deleteQuestion(999)).rejects.toThrow("Question not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const error = new Error('Database error');
        prismaMock.question.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteQuestionService.deleteQuestion(1)).rejects.toThrow('Database error');
    });
});

describe('GetAllQuestionsService', () => {
    let getAllQuestionsService: GetAllQuestionsService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        getAllQuestionsService = new GetAllQuestionsService(prismaMock);
    });

    it('should return a list of questions successfully', async () => {
        const mockQuestions = [
            { id: 1, title: 'What is computer science?' },
            { id: 2, title: 'What is programming?' }
        ];
        prismaMock.question.findMany = jest.fn().mockResolvedValue(mockQuestions);

        const result = await getAllQuestionsService.getAll(1, 10, 'title', 'asc');

        expect(prismaMock.question.findMany).toHaveBeenCalledWith({
            skip: 0,
            take: 10,
            include: {
                student: true,
                professor: true,
                discipline: true,
            },
            orderBy: {
                title: 'asc',
            },
        });
        expect(result).toEqual(mockQuestions);
    });

    it('should throw an error for unexpected issues', async () => {
        const error = new Error('Database error');
        prismaMock.question.findMany = jest.fn().mockRejectedValue(error);

        await expect(getAllQuestionsService.getAll(1, 10, 'title', 'asc')).rejects.toThrow('Database error');
    });

    it('should handle pagination correctly', async () => {
        const mockQuestions = [{ id: 1, title: 'What is computer science?' }];
        prismaMock.question.findMany = jest.fn().mockResolvedValue(mockQuestions);

        const pageNumber = 2;
        const limitNumber = 10;
        const result = await getAllQuestionsService.getAll(pageNumber, limitNumber, 'title', 'asc');

        const expectedSkip = (pageNumber - 1) * limitNumber;
        expect(prismaMock.question.findMany).toHaveBeenCalledWith({
            skip: expectedSkip,
            take: limitNumber,
            include: {
                student: true,
                professor: true,
                discipline: true,
            },
            orderBy: {
                title: 'asc',
            },
        });
        expect(result).toEqual(mockQuestions);
    });
});
describe('GetQuestionByIdService', () => {
    let getQuestionByIdService: GetQuestionByIdService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        getQuestionByIdService = new GetQuestionByIdService(prismaMock);
    });

    it('should return a question when found', async () => {
        const mockQuestion = {
            id: 1,
            title: 'What is computer science?',
            content: 'A brief explanation of computer science.',
        };
        prismaMock.question.findUnique = jest.fn().mockResolvedValue(mockQuestion);

        const result = await getQuestionByIdService.getQuestionById(1);

        expect(prismaMock.question.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                student: true,
                professor: true,
                discipline: true,
            },
        });
        expect(result).toEqual(mockQuestion);
    });

    it('should throw an error when the question is not found', async () => {
        prismaMock.question.findUnique = jest.fn().mockResolvedValue(null);

        await expect(getQuestionByIdService.getQuestionById(999)).rejects.toThrow("Question not found.");
    });

    it('should throw an error for unexpected issues', async () => {
        const error = new Error('Database error');
        prismaMock.question.findUnique = jest.fn().mockRejectedValue(error);

        await expect(getQuestionByIdService.getQuestionById(1)).rejects.toThrow('Database error');
    });
});
describe('PatchQuestionService', () => {
    let patchQuestionService: PatchQuestionService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        patchQuestionService = new PatchQuestionService(prismaMock);
    });

    it('should update a question successfully', async () => {
        const mockUpdatedQuestion = {
            id: 1,
            title: 'Updated Question',
            content: 'Updated content.',
        };
        prismaMock.question.update = jest.fn().mockResolvedValue(mockUpdatedQuestion);

        const updates = { title: 'Updated Question', content: 'Updated content.' };
        const result = await patchQuestionService.patchQuestion(1, updates);

        expect(prismaMock.question.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: updates,
            include: {
                student: true,
                professor: true,
                discipline: true,
            },
        });
        expect(result).toEqual(mockUpdatedQuestion);
    });

    it('should throw an error if the question is not found', async () => {
        const error = new PrismaClientKnownRequestError('Question not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.question.update = jest.fn().mockRejectedValue(error);

        await expect(patchQuestionService.patchQuestion(999, {})).rejects.toThrow("Question not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const error = new Error('Database error');
        prismaMock.question.update = jest.fn().mockRejectedValue(error);

        await expect(patchQuestionService.patchQuestion(1, {})).rejects.toThrow('Database error');
    });
});
describe('UpdateQuestionService', () => {
    let updateQuestionService: UpdateQuestionService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        updateQuestionService = new UpdateQuestionService(prismaMock);
    });

    it('should update a question successfully', async () => {
        const mockUpdatedQuestion = {
            id: 1,
            title: 'Updated Question',
            content: 'Updated content.',
        };
        prismaMock.question.update = jest.fn().mockResolvedValue(mockUpdatedQuestion);

        const updates = { title: 'Updated Question', content: 'Updated content.' };
        const result = await updateQuestionService.updateQuestion(1, updates);

        expect(prismaMock.question.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: updates,
            include: {
                student: true,
                professor: true,
                discipline: true,
            },
        });
        expect(result).toEqual(mockUpdatedQuestion);
    });

    it('should convert image from base64 to Buffer', async () => {
        const mockUpdatedQuestion = {
            id: 1,
            title: 'Updated Question',
            content: 'Updated content.',
        };
        prismaMock.question.update = jest.fn().mockResolvedValue(mockUpdatedQuestion);

        const updates = { title: 'Updated Question', image: 'base64ImageString' };
        const result = await updateQuestionService.updateQuestion(1, updates);

        expect(prismaMock.question.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                title: 'Updated Question',
                image: expect.any(Buffer),
            },
            include: {
                student: true,
                professor: true,
                discipline: true,
            },
        });
        expect(result).toEqual(mockUpdatedQuestion);
    });

    it('should throw an error if the question is not found', async () => {
        const error = new PrismaClientKnownRequestError('Question not found.', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.question.update = jest.fn().mockRejectedValue(error);

        await expect(updateQuestionService.updateQuestion(999, {})).rejects.toThrow("Question not found.");
    });

    it('should throw a generic error for other issues', async () => {
        const error = new Error('Database error');
        prismaMock.question.update = jest.fn().mockRejectedValue(error);

        await expect(updateQuestionService.updateQuestion(1, {})).rejects.toThrow('Database error');
    });
});