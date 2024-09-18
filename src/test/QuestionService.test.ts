import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { CreateQuestionService } from '../main/services/question/CreateQuestionService';

const prismaClient = new PrismaClient();
const createQuestionService = new CreateQuestionService();

let disciplineId: number;
let professorId: number;
let studentId: number;

beforeAll(async () => {
  const disciplina = await prismaClient.discipline.create({
    data: {
      courseCode: 'CS101',
      curriculumCode: '2024',
      subjectCode: 'CS001',
      name: 'Introdução à Computação',
      type: 'Obrigatória',
    },
  });
  disciplineId = disciplina.id;

  const professor = await prismaClient.professor.create({
    data: {
      id: 1,
      name: 'Professor X',
      identityProviderId: 'professor-identity',
      code: 'PROF001',
      email: 'professorx@example.com',
      password: 'senha-hash',
      disciplines: {
        connect: [{ id: disciplineId }],
      },
    },
  });
  professorId = professor.id;

  const estudante = await prismaClient.student.create({
    data: {
      id: 1,
      name: 'João Silva',
      identityProviderId: 'student-identity',
      code: 'STUD001',
      email: 'joaosilva@example.com',
      password: 'senha-hash',
    },
  });
  studentId = estudante.id;
});

afterAll(async () => {
  await prismaClient.question.deleteMany({});
  await prismaClient.professor.deleteMany({});
  await prismaClient.student.deleteMany({});
  await prismaClient.discipline.deleteMany({});
  await prismaClient.$disconnect();
});

describe('CreateQuestionService', () => {
  test('deve criar uma questão para um professor válido', async () => {
    const questao = await createQuestionService.createQuestion({
      title: 'O que é um computador?',
      content: 'Explique o que é um computador.',
      answer: 'Um computador é um dispositivo eletrônico que processa informações.',
      image: 'imagem-base64',
      professorId: professorId,
      disciplineId: disciplineId,
    });

    expect(questao).toHaveProperty('id');
    expect(questao.title).toBe('O que é um computador?');
  });

  test('deve criar uma questão para um estudante válido', async () => {
    const questao = await createQuestionService.createQuestion({
      title: 'O que é programação?',
      content: 'Explique o que é programação.',
      answer: 'Programação é o processo de criação de software.',
      image: 'imagem-base64',
      studentId: studentId,
      disciplineId: disciplineId,
    });

    expect(questao).toHaveProperty('id');
    expect(questao.title).toBe('O que é programação?');
  });

  test('deve lançar um erro se a disciplina não existir', async () => {
    await expect(
      createQuestionService.createQuestion({
        title: 'Questão com disciplina inválida',
        content: 'Este teste falhará por causa de uma disciplina inválida.',
        answer: 'Sem resposta.',
        image: 'imagem-base64',
        professorId: professorId,
        disciplineId: 99999,
      })
    ).rejects.toThrow('Discipline not found.');
  });

  test('deve lançar um erro se a professor não existir', async () => {
    await expect(
      createQuestionService.createQuestion({
        title: 'Questão com disciplina inválida',
        content: 'Este teste falhará por causa de uma disciplina inválida.',
        answer: 'Sem resposta.',
        image: 'imagem-base64',
        professorId: 9999999,
        disciplineId: disciplineId,
      })
    ).rejects.toThrow('Author not found.');
  });

  test('deve lançar um erro se a estudante não existir', async () => {
    await expect(
      createQuestionService.createQuestion({
        title: 'Questão com disciplina inválida',
        content: 'Este teste falhará por causa de uma disciplina inválida.',
        answer: 'Sem resposta.',
        image: 'imagem-base64',
        studentId: 9999999,
        disciplineId: disciplineId,
      })
    ).rejects.toThrow('Author not found.');
  });


  test('deve lançar um erro se uma questão com o mesmo título já existir', async () => {
    await createQuestionService.createQuestion({
      title: 'Questão duplicada',
      content: 'Primeira questão.',
      answer: 'Resposta 1.',
      image: 'imagem-base64',
      professorId: professorId,
      disciplineId: disciplineId,
    });

    await expect(
      createQuestionService.createQuestion({
        title: 'Questão duplicada',
        content: 'Segunda questão.',
        answer: 'Resposta 2.',
        image: 'imagem-base64',
        professorId: professorId,
        disciplineId: disciplineId,
      })
    ).rejects.toThrow('Question with the same title already exists.');
  });
});
