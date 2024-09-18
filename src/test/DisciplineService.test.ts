import { PrismaClient } from '@prisma/client';
import { CreateDisciplineService } from '../main/services/discipline/CreateDisciplineService';
import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { DeleteDisciplineService } from '../main/services/discipline/DeleteDisciplineService';
import { GetAllDisciplineService } from '../main/services/discipline/GetAllDisciplineService';
import { GetDisciplineByIdService } from '../main/services/discipline/GetDisciplineByIdService';
import { PatchDisciplineService } from '../main/services/discipline/PatchDisciplineService';
import { UpdateDisciplineService } from '../main/services/discipline/UpdateDisciplineService';

const prismaClient = new PrismaClient();

beforeAll(async () => {
});

afterAll(async () => {
  await prismaClient.discipline.deleteMany({});
  await prismaClient.$disconnect();
});

describe('CreateDisciplineService', () => {
  let createdDisciplineId: number;
  const createDisciplineService = new CreateDisciplineService();

  afterAll(async () => {
    await prismaClient.discipline.deleteMany({});
    await prismaClient.$disconnect();
});

  test('deve criar uma nova disciplina com sucesso', async () => {
    const disciplineData = {
      courseCode: 'CS101',
      curriculumCode: 'CUR2024',
      subjectCode: 'SUB123',
      name: 'Introduction to Computer Science',
      type: 'Core',
    };

    const newDiscipline = await createDisciplineService.createDiscipline(disciplineData);

    expect(newDiscipline).toBeDefined();
    expect(newDiscipline).toHaveProperty('id');
    expect(newDiscipline).toHaveProperty('courseCode', disciplineData.courseCode);
    expect(newDiscipline).toHaveProperty('curriculumCode', disciplineData.curriculumCode);
    expect(newDiscipline).toHaveProperty('subjectCode', disciplineData.subjectCode);
    expect(newDiscipline).toHaveProperty('name', disciplineData.name);
    expect(newDiscipline).toHaveProperty('type', disciplineData.type);

    createdDisciplineId = newDiscipline.id;
  });
});



describe('DeleteDisciplineService', () => {
  let testDisciplineId: number;
  const deleteDisciplineService = new DeleteDisciplineService();

  beforeAll(async () => {
    const createdDiscipline = await prismaClient.discipline.create({
      data: {
        courseCode: 'CS101',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB123',
        name: 'Introduction to Computer Science',
        type: 'Core',
      },
    });
    testDisciplineId = createdDiscipline.id;
  });

  afterAll(async () => {
    await prismaClient.discipline.deleteMany({});
    await prismaClient.$disconnect();
});

  test('deve excluir uma disciplina com sucesso', async () => {
    const deletedDiscipline = await deleteDisciplineService.deleteDiscipline(testDisciplineId);

    expect(deletedDiscipline).toBeDefined();
    expect(deletedDiscipline).toHaveProperty('id', testDisciplineId);
    expect(deletedDiscipline).toHaveProperty('courseCode', 'CS101');
    expect(deletedDiscipline).toHaveProperty('curriculumCode', 'CUR2024');
    expect(deletedDiscipline).toHaveProperty('subjectCode', 'SUB123');
    expect(deletedDiscipline).toHaveProperty('name', 'Introduction to Computer Science');
    expect(deletedDiscipline).toHaveProperty('type', 'Core');
  });

  test('deve lançar um erro se a disciplina não for encontrada', async () => {
    const nonExistentId = 9999999;

    await expect(deleteDisciplineService.deleteDiscipline(nonExistentId))
      .rejects
      .toThrow('Discipline not found.');
  });
});

describe('GetAllDisciplineService', () => {
    const getAllDisciplineService = new GetAllDisciplineService();
    const testDisciplines = [
        {
        courseCode: 'CS101',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB123',
        name: 'Introduction to Computer Science',
        type: 'Core',
        },
        {
        courseCode: 'CS102',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB124',
        name: 'Data Structures',
        type: 'Core',
        },
        {
        courseCode: 'CS103',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB125',
        name: 'Algorithms',
        type: 'Core',
        },
    ];

    beforeAll(async () => {
        await prismaClient.discipline.createMany({
        data: testDisciplines,
        });
    });

    afterAll(async () => {
        await prismaClient.discipline.deleteMany({});
        await prismaClient.$disconnect();
    });

    test('deve obter todas as disciplinas sem paginação', async () => {
        const disciplines = await getAllDisciplineService.getAll();

        expect(disciplines).toBeDefined();
        expect(disciplines.length).toBe(testDisciplines.length);
        expect(disciplines[0]).toHaveProperty('courseCode', 'CS101');
        expect(disciplines[1]).toHaveProperty('courseCode', 'CS102');
        expect(disciplines[2]).toHaveProperty('courseCode', 'CS103');
    });

    test('deve obter disciplinas com paginação', async () => {
        const pageNumber = 1;
        const limitNumber = 2;
        const disciplines = await getAllDisciplineService.getAll(pageNumber, limitNumber);

        expect(disciplines).toBeDefined();
        expect(disciplines.length).toBe(limitNumber);
        expect(disciplines[0]).toHaveProperty('courseCode', 'CS101');
        expect(disciplines[1]).toHaveProperty('courseCode', 'CS102');
    });
});

describe('GetDisciplineByIdService', () => {
  let testDisciplineId: number;
  const getDisciplineByIdService = new GetDisciplineByIdService();

  beforeAll(async () => {
    const createdDiscipline = await prismaClient.discipline.create({
      data: {
        courseCode: 'CS101',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB123',
        name: 'Introduction to Computer Science',
        type: 'Core',
      },
    });
    testDisciplineId = createdDiscipline.id;
  });

  afterAll(async () => {
    await prismaClient.discipline.deleteMany({});
    await prismaClient.$disconnect();
  });

  test('deve obter a disciplina pelo ID com sucesso', async () => {
    const discipline = await getDisciplineByIdService.getDisciplineById(testDisciplineId);

    expect(discipline).toBeDefined();
    expect(discipline).toHaveProperty('id', testDisciplineId);
    expect(discipline).toHaveProperty('courseCode', 'CS101');
    expect(discipline).toHaveProperty('curriculumCode', 'CUR2024');
    expect(discipline).toHaveProperty('subjectCode', 'SUB123');
    expect(discipline).toHaveProperty('name', 'Introduction to Computer Science');
    expect(discipline).toHaveProperty('type', 'Core');
  });

  test('deve lançar um erro se a disciplina não for encontrada', async () => {
    const nonExistentId = 9999999;

    await expect(getDisciplineByIdService.getDisciplineById(nonExistentId))
      .rejects
      .toThrow('Discipline not found.');
  });
});

describe('PatchDisciplineService', () => {
  let testDisciplineId: number;
  const patchDisciplineService = new PatchDisciplineService();

  beforeAll(async () => {
    const createdDiscipline = await prismaClient.discipline.create({
      data: {
        courseCode: 'CS101',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB123',
        name: 'Introduction to Computer Science',
        type: 'Core',
      },
    });
    testDisciplineId = createdDiscipline.id;
  });

  afterAll(async () => {
    await prismaClient.discipline.deleteMany({});
    await prismaClient.$disconnect();
  });

  test('deve atualizar uma disciplina com sucesso', async () => {
    const updates = {
      name: 'Advanced Computer Science',
      type: 'Elective',
    };

    const updatedDiscipline = await patchDisciplineService.patchDiscipline(testDisciplineId, updates);

    expect(updatedDiscipline).toBeDefined();
    expect(updatedDiscipline).toHaveProperty('id', testDisciplineId);
    expect(updatedDiscipline).toHaveProperty('name', 'Advanced Computer Science');
    expect(updatedDiscipline).toHaveProperty('type', 'Elective');
  });

  test('deve lançar um erro se a disciplina não for encontrada', async () => {
    const nonExistentId = 9999999;
    const updates = {
      name: 'Should Not Update',
    };

    await expect(patchDisciplineService.patchDiscipline(nonExistentId, updates))
      .rejects
      .toThrow('Discipline not found.');
  });
});

describe('UpdateDisciplineService', () => {
  let testDisciplineId: number;
  const updateDisciplineService = new UpdateDisciplineService();

  beforeAll(async () => {
    const createdDiscipline = await prismaClient.discipline.create({
      data: {
        courseCode: 'CS101',
        curriculumCode: 'CUR2024',
        subjectCode: 'SUB123',
        name: 'Introduction to Computer Science',
        type: 'Core',
      },
    });
    testDisciplineId = createdDiscipline.id;
  });

  afterAll(async () => {
    await prismaClient.discipline.deleteMany({});
    await prismaClient.$disconnect();
  });

  test('deve atualizar uma disciplina com sucesso', async () => {
    const updates = {
      courseCode: 'CS102',
      curriculumCode: 'CUR2025',
      subjectCode: 'SUB124',
      name: 'Advanced Computer Science',
      type: 'Elective',
    };

    const updatedDiscipline = await updateDisciplineService.updateDiscipline(testDisciplineId, updates);

    expect(updatedDiscipline).toBeDefined();
    expect(updatedDiscipline).toHaveProperty('id', testDisciplineId);
    expect(updatedDiscipline).toHaveProperty('courseCode', 'CS102');
    expect(updatedDiscipline).toHaveProperty('curriculumCode', 'CUR2025');
    expect(updatedDiscipline).toHaveProperty('subjectCode', 'SUB124');
    expect(updatedDiscipline).toHaveProperty('name', 'Advanced Computer Science');
    expect(updatedDiscipline).toHaveProperty('type', 'Elective');
  });

  test('deve lançar um erro se a disciplina não for encontrada', async () => {
    const nonExistentId = 9999999;
    const updates = {
      courseCode: 'CS103',
      curriculumCode: 'CUR2026',
      subjectCode: 'SUB125',
      name: 'Data Structures',
      type: 'Core',
    };

    await expect(updateDisciplineService.updateDiscipline(nonExistentId, updates))
      .rejects
      .toThrow('Discipline not found.');
  });
});