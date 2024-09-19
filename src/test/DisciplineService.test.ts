import { PrismaClient } from '@prisma/client';
import { CreateDisciplineService } from '../main/services/discipline/CreateDisciplineService';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DeleteDisciplineService } from '../main/services/discipline/DeleteDisciplineService';
import { GetAllDisciplineService } from '../main/services/discipline/GetAllDisciplineService';
import { GetDisciplineByIdService } from '../main/services/discipline/GetDisciplineByIdService';
import { PatchDisciplineService } from '../main/services/discipline/PatchDisciplineService';
import { UpdateDisciplineService } from '../main/services/discipline/UpdateDisciplineService';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                discipline: {
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

describe('CreateDisciplineService', () => {
    let createDisciplineService: CreateDisciplineService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createDisciplineService = new CreateDisciplineService(prismaMock);
    });

    it('should create a new discipline successfully', async () => {
        const disciplineData = {
            courseCode: 'CS101',
            curriculumCode: 'CUR2023',
            subjectCode: 'SUB123',
            name: 'Computer Science',
            type: 'Core',
        };

        const newDiscipline = { id: 1, ...disciplineData };
        prismaMock.discipline.create = jest.fn().mockResolvedValue(newDiscipline);

        const result = await createDisciplineService.createDiscipline(disciplineData);

        expect(prismaMock.discipline.create).toHaveBeenCalledWith({
            data: disciplineData,
        });
        expect(result).toEqual(newDiscipline);
    });

    it('should handle errors when creating a discipline', async () => {
        const error = new Error('Database error');
        prismaMock.discipline.create = jest.fn().mockRejectedValue(error);

        const result = await createDisciplineService.createDiscipline({
            courseCode: 'CS101',
            curriculumCode: 'CUR2023',
            subjectCode: 'SUB123',
            name: 'Computer Science',
            type: 'Core',
        });

        expect(prismaMock.discipline.create).toHaveBeenCalled();
        expect(result).toEqual(error);
    });
});

describe('DeleteDisciplineService', () => {
  let deleteDisciplineService: DeleteDisciplineService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      deleteDisciplineService = new DeleteDisciplineService(prismaMock);
  });

  it('should delete a discipline successfully', async () => {
      const id = 1;
      const deletedDiscipline = { id, name: 'Computer Science' };
      prismaMock.discipline.delete = jest.fn().mockResolvedValue(deletedDiscipline);

      const result = await deleteDisciplineService.deleteDiscipline(id);

      expect(prismaMock.discipline.delete).toHaveBeenCalledWith({
          where: { id },
      });
      expect(result).toEqual(deletedDiscipline);
  });

  it('should throw an error when discipline not found', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.discipline.delete = jest.fn().mockRejectedValue(error);

      await expect(deleteDisciplineService.deleteDiscipline(999)).rejects.toThrow('Discipline not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.discipline.delete = jest.fn().mockRejectedValue(error);

      await expect(deleteDisciplineService.deleteDiscipline(1)).rejects.toThrow('Unexpected error');
  });
});

describe('GetAllDisciplineService', () => {
  let getAllDisciplineService: GetAllDisciplineService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      getAllDisciplineService = new GetAllDisciplineService(prismaMock);
  });

  it('should return all disciplines with pagination', async () => {
      const pageNumber = 1;
      const limitNumber = 10;
      const disciplines = [{ id: 1, name: 'Computer Science' }, { id: 2, name: 'Mathematics' }];
      prismaMock.discipline.findMany = jest.fn().mockResolvedValue(disciplines);

      const result = await getAllDisciplineService.getAll(pageNumber, limitNumber);

      expect(prismaMock.discipline.findMany).toHaveBeenCalledWith({
          skip: (pageNumber - 1) * limitNumber,
          take: limitNumber,
          include: {
              questions: true,
          },
      });
      expect(result).toEqual(disciplines);
  });

  it('should return all disciplines without pagination', async () => {
      const disciplines = [{ id: 1, name: 'Computer Science' }, { id: 2, name: 'Mathematics' }];
      prismaMock.discipline.findMany = jest.fn().mockResolvedValue(disciplines);

      const result = await getAllDisciplineService.getAll(undefined, undefined);

      expect(prismaMock.discipline.findMany).toHaveBeenCalledWith({
          skip: 0,
          take: undefined,
          include: {
              questions: true,
          },
      });
      expect(result).toEqual(disciplines);
  });

  it('should handle errors when fetching disciplines', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.discipline.findMany = jest.fn().mockRejectedValue(error);

      await expect(getAllDisciplineService.getAll(1, 10)).rejects.toThrow('Discipline not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.discipline.findMany = jest.fn().mockRejectedValue(error);

      await expect(getAllDisciplineService.getAll(1, 10)).rejects.toThrow('Unexpected error');
  });
});

describe('GetDisciplineByIdService', () => {
  let getDisciplineByIdService: GetDisciplineByIdService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      getDisciplineByIdService = new GetDisciplineByIdService(prismaMock);
  });

  it('should return a discipline by ID successfully', async () => {
      const id = 1;
      const discipline = { id, name: 'Computer Science', questions: [] };
      prismaMock.discipline.findUnique = jest.fn().mockResolvedValue(discipline);

      const result = await getDisciplineByIdService.getDisciplineById(id);

      expect(prismaMock.discipline.findUnique).toHaveBeenCalledWith({
          where: { id },
          include: {
              questions: true,
          },
      });
      expect(result).toEqual(discipline);
  });

  it('should throw an error when discipline not found', async () => {
      prismaMock.discipline.findUnique = jest.fn().mockResolvedValue(null);

      await expect(getDisciplineByIdService.getDisciplineById(999)).rejects.toThrow('Discipline not found.');
  });

  it('should handle unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.discipline.findUnique = jest.fn().mockRejectedValue(error);

      await expect(getDisciplineByIdService.getDisciplineById(1)).rejects.toThrow('Unexpected error');
  });
});

describe('PatchDisciplineService', () => {
  let patchDisciplineService: PatchDisciplineService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      patchDisciplineService = new PatchDisciplineService(prismaMock);
  });

  it('should update a discipline successfully', async () => {
      const id = 1;
      const updates = { name: 'Updated Discipline' };
      const updatedDiscipline = { id, ...updates };
      prismaMock.discipline.update = jest.fn().mockResolvedValue(updatedDiscipline);

      const result = await patchDisciplineService.patchDiscipline(id, updates);

      expect(prismaMock.discipline.update).toHaveBeenCalledWith({
          where: { id },
          data: updates,
      });
      expect(result).toEqual(updatedDiscipline);
  });

  it('should throw an error when discipline not found', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.discipline.update = jest.fn().mockRejectedValue(error);

      await expect(patchDisciplineService.patchDiscipline(999, { name: 'New Name' })).rejects.toThrow('Discipline not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.discipline.update = jest.fn().mockRejectedValue(error);

      await expect(patchDisciplineService.patchDiscipline(1, { name: 'New Name' })).rejects.toThrow('Unexpected error');
  });
});

describe('UpdateDisciplineService', () => {
  let updateDisciplineService: UpdateDisciplineService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      updateDisciplineService = new UpdateDisciplineService(prismaMock);
  });

  it('should update a discipline successfully', async () => {
      const id = 1;
      const data = {
          courseCode: 'CS101',
          curriculumCode: 'CUR2021',
          subjectCode: 'SUB001',
          name: 'Updated Discipline',
          type: 'Core',
      };
      const updatedDiscipline = { id, ...data };
      prismaMock.discipline.update = jest.fn().mockResolvedValue(updatedDiscipline);

      const result = await updateDisciplineService.updateDiscipline(id, data);

      expect(prismaMock.discipline.update).toHaveBeenCalledWith({
          where: { id },
          data,
      });
      expect(result).toEqual(updatedDiscipline);
  });

  it('should throw an error when discipline not found', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.discipline.update = jest.fn().mockRejectedValue(error);

      await expect(updateDisciplineService.updateDiscipline(999, {
          courseCode: 'CS101',
          curriculumCode: 'CUR2021',
          subjectCode: 'SUB001',
          name: 'Updated Discipline',
          type: 'Core',
      })).rejects.toThrow('Discipline not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.discipline.update = jest.fn().mockRejectedValue(error);

      await expect(updateDisciplineService.updateDiscipline(1, {
          courseCode: 'CS101',
          curriculumCode: 'CUR2021',
          subjectCode: 'SUB001',
          name: 'Updated Discipline',
          type: 'Core',
      })).rejects.toThrow('Unexpected error');
  });
});