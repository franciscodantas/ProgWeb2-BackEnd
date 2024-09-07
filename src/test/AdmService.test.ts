import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { CreateAdmService } from '../main/services/adm/CreateAdmService';
import { BcryptUtils } from '../main/utils/BcryptUtil';
import { DeleteAdmService } from '../main/services/adm/DeleteAdmService';
import { GetAdminByIdService } from '../main/services/adm/GetAdminByIdService';

const prismaClient = new PrismaClient();

beforeAll(async () => {
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

describe('CreateAdmService', () => {
  const createAdmService = new CreateAdmService();

  test('deve criar um novo administrador com sucesso', async () => {
    const name = 'Admin Test';
    const email = 'admin@test.com';
    const password = 'securepassword123';

    const newAdm = await createAdmService.createAdm(name, email, password);

    expect(newAdm).toHaveProperty('id');
    expect(newAdm.name).toBe(name);
    expect(newAdm.email).toBe(email);

    const isPasswordValid = await BcryptUtils.comparePassword(password, newAdm.password);
    expect(isPasswordValid).toBe(true);
  });
});

describe('DeleteAdmService', () => {

  const deleteAdmService = new DeleteAdmService();
  let testAdminId: number;

  beforeAll(async () => {
    const createdAdm = await prismaClient.adm.create({
      data: {
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: 'hashedpassword'
      }
    });
    testAdminId = createdAdm.id;
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  test('deve deletar um administrador com sucesso', async () => {
    const result = await deleteAdmService.delete(testAdminId);
    expect(result).toHaveProperty('id');
    expect(result.id).toBe(testAdminId);
  });

  test('deve lançar um erro se o administrador não for encontrado', async () => {
    const nonExistentId = 9999999;

    try {
      await deleteAdmService.delete(nonExistentId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Adm not found.');
    }
  });
});

describe('GetAdminByIdService', () => {
  const getAdminByIdService = new GetAdminByIdService();
  let testAdminId: number;

  beforeAll(async () => {
    const createdAdm = await prismaClient.adm.create({
      data: {
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: 'hashedpassword'
      }
    });
    testAdminId = createdAdm.id;
  });

  afterAll(async () => {
    await prismaClient.adm.delete({ where: { id: testAdminId } });
    await prismaClient.$disconnect();
  });

  test('deve obter um administrador por ID com sucesso', async () => {
    const admin = await getAdminByIdService.getAdminById(testAdminId);
    expect(admin).toBeDefined();
    expect(admin).toHaveProperty('id', testAdminId);
    expect(admin).toHaveProperty('name', 'Test Admin');
    expect(admin).toHaveProperty('email', 'testadmin@example.com');
  });

  test('deve retornar null se o administrador não for encontrado', async () => {
    const nonExistentId = 9999999;
    const admin = await getAdminByIdService.getAdminById(nonExistentId);
    expect(admin).toBeNull();
  });
});

