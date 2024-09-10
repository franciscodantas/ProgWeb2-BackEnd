import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { CreateAdmService } from '../main/services/adm/CreateAdmService';
import { BcryptUtils } from '../main/utils/BcryptUtil';
import { DeleteAdmService } from '../main/services/adm/DeleteAdmService';
import { GetAdminByIdService } from '../main/services/adm/GetAdminByIdService';
import { GetAdminsService } from '../main/services/adm/GetAdminsService';
import { PatchAdmService } from '../main/services/adm/PatchAdmService';
import { UpdateAdmService } from '../main/services/adm/UpdateAdmService';

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

describe('GetAdminsService', () => {
  const getAdminsService = new GetAdminsService();
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
    const admin = await prismaClient.adm.findUnique({ where: { id: testAdminId } });
    if (admin) {
      await prismaClient.adm.delete({ where: { id: testAdminId } });
    }
    await prismaClient.$disconnect();
  });

  test('deve obter uma lista de administradores com sucesso', async () => {
    const admins = await getAdminsService.getAdmins();
    expect(admins).toBeDefined();
    expect(admins.length).toBeGreaterThan(0);
  
    const admin = admins.find(a => a.id === testAdminId);
    expect(admin).toBeDefined();
    expect(admin).toHaveProperty('id', testAdminId);
    expect(admin).toHaveProperty('name', 'Test Admin');
    expect(admin).toHaveProperty('email', 'testadmin@example.com');
  });

  test('deve retornar uma lista vazia se não houver administradores', async () => {
    await prismaClient.adm.deleteMany({});

    const admins = await getAdminsService.getAdmins();
    expect(admins).toEqual([]);
  });
});

describe('PatchAdmService', () => {
  let testAdminId: number;
  const patchAdmService = new PatchAdmService();

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

  test('deve atualizar um administrador com sucesso', async () => {
    const updates = { name: 'Updated Admin', email: 'updatedadmin@example.com' };
    const updatedAdmin = await patchAdmService.patchAdm(testAdminId, updates);

    expect(updatedAdmin).toBeDefined();
    expect(updatedAdmin).toHaveProperty('id', testAdminId);
    expect(updatedAdmin).toHaveProperty('name', 'Updated Admin');
    expect(updatedAdmin).toHaveProperty('email', 'updatedadmin@example.com');
  });

  test('deve lançar um erro quando o administrador não for encontrado', async () => {
    const nonExistentId = 9999999;
    const updates = { name: 'Should Not Exist' };

    await expect(patchAdmService.patchAdm(nonExistentId, updates))
      .rejects
      .toThrowError('Adm not found.');
  });

  test('deve manter os campos não atualizados inalterados', async () => {
    const updates = { name: 'Partially Updated Admin' };
    const partiallyUpdatedAdmin = await patchAdmService.patchAdm(testAdminId, updates);

    expect(partiallyUpdatedAdmin).toBeDefined();
    expect(partiallyUpdatedAdmin).toHaveProperty('id', testAdminId);
    expect(partiallyUpdatedAdmin).toHaveProperty('name', 'Partially Updated Admin');
    expect(partiallyUpdatedAdmin).toHaveProperty('email', 'updatedadmin@example.com');
  });
});

describe('UpdateAdmService', () => {
  let testAdminId: number;
  let initialPassword: string;
  const updateAdmService = new UpdateAdmService();

  beforeAll(async () => {
    initialPassword = 'initialpassword';
    const createdAdm = await prismaClient.adm.create({
      data: {
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: await BcryptUtils.hashPassword(initialPassword),
      }
    });
    testAdminId = createdAdm.id;
  });

  afterAll(async () => {
    await prismaClient.adm.delete({ where: { id: testAdminId } });
    await prismaClient.$disconnect();
  });

  test('deve atualizar um administrador com sucesso', async () => {
    const newName = 'Updated Admin';
    const newEmail = 'updatedadmin@example.com';
    const newPassword = 'newpassword';

    const updatedAdmin = await updateAdmService.updateAdm(testAdminId, newName, newEmail, newPassword);

    expect(updatedAdmin).toBeDefined();
    expect(updatedAdmin).toHaveProperty('id', testAdminId);
    expect(updatedAdmin).toHaveProperty('name', newName);
    expect(updatedAdmin).toHaveProperty('email', newEmail);

    const passwordMatches = await BcryptUtils.comparePassword(newPassword, updatedAdmin.password);
    expect(passwordMatches).toBe(true);
  });

  test('deve lançar um erro quando o administrador não for encontrado', async () => {
    const nonExistentId = 9999999;
    const newName = 'Non Existent Admin';
    const newEmail = 'nonexistentadmin@example.com';
    const newPassword = 'password';

    await expect(updateAdmService.updateAdm(nonExistentId, newName, newEmail, newPassword))
      .rejects
      .toThrowError('Adm not found.');
  });

  test('deve atualizar apenas os campos fornecidos', async () => {
    const newName = 'Partially Updated Admin';
    const newEmail = 'partiallyupdated@example.com';

    const updatedAdmin = await updateAdmService.updateAdm(testAdminId, newName, newEmail, initialPassword);

    expect(updatedAdmin).toBeDefined();
    expect(updatedAdmin).toHaveProperty('id', testAdminId);
    expect(updatedAdmin).toHaveProperty('name', newName);
    expect(updatedAdmin).toHaveProperty('email', newEmail);

    const passwordMatches = await BcryptUtils.comparePassword(initialPassword, updatedAdmin.password);
    expect(passwordMatches).toBe(true);
  });
});