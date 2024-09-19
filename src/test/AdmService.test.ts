import { PrismaClient } from '@prisma/client';
import { CreateAdmService } from '../main/services/adm/CreateAdmService';
import { BcryptUtils } from '../main/utils/BcryptUtil';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DeleteAdmService } from '../main/services/adm/DeleteAdmService';
import { GetAdminByIdService } from '../main/services/adm/GetAdminByIdService';
import { GetAdminsService } from '../main/services/adm/GetAdminsService';
import { PatchAdmService } from '../main/services/adm/PatchAdmService';
import { UpdateAdmService } from '../main/services/adm/UpdateAdmService';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                adm: {
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

describe('CreateAdmService', () => {
    let createAdmService: CreateAdmService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createAdmService = new CreateAdmService(prismaMock);
    });

    it('should create a new admin successfully', async () => {
        const hashedPassword = 'hashedPassword123';
        (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const adminData = { id: 1, name: 'John Doe', email: 'john@example.com', password: hashedPassword };
        prismaMock.adm.create = jest.fn().mockResolvedValue(adminData);

        const result = await createAdmService.createAdm('John Doe', 'john@example.com', 'password123');

        expect(BcryptUtils.hashPassword).toHaveBeenCalledWith('password123');
        expect(prismaMock.adm.create).toHaveBeenCalledWith({
            data: {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
            },
        });
        expect(result).toEqual(adminData);
    });
});

describe('DeleteAdmService', () => {
  let deleteAdmService: DeleteAdmService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      deleteAdmService = new DeleteAdmService(prismaMock);
  });

  it('should delete an admin successfully', async () => {
      const deletedAdm = { id: 1, name: 'John Doe', email: 'john@example.com' };
      prismaMock.adm.delete = jest.fn().mockResolvedValue(deletedAdm);

      const result = await deleteAdmService.delete(1);

      expect(prismaMock.adm.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(deletedAdm);
  });

  it('should throw an error when admin not found', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.adm.delete = jest.fn().mockRejectedValue(error);

      await expect(deleteAdmService.delete(999)).rejects.toThrow('Adm not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.adm.delete = jest.fn().mockRejectedValue(error);

      await expect(deleteAdmService.delete(1)).rejects.toThrow('Unexpected error');
  });
});

describe('GetAdminByIdService', () => {
  let getAdminByIdService: GetAdminByIdService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      getAdminByIdService = new GetAdminByIdService(prismaMock);
  });

  it('should return admin when found', async () => {
      const adminData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      prismaMock.adm.findUnique = jest.fn().mockResolvedValue(adminData);

      const result = await getAdminByIdService.getAdminById(1);

      expect(prismaMock.adm.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(adminData);
  });

  it('should return null when admin not found', async () => {
      prismaMock.adm.findUnique = jest.fn().mockResolvedValue(null);

      const result = await getAdminByIdService.getAdminById(999);

      expect(prismaMock.adm.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(result).toBeNull();
  });

  it('should throw an error when there is a database error', async () => {
      const error = new PrismaClientKnownRequestError('Database error.', {code: 'P2000', clientVersion: '1'});
      prismaMock.adm.findUnique = jest.fn().mockRejectedValue(error);

      await expect(getAdminByIdService.getAdminById(1)).rejects.toThrow('Adm not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.adm.findUnique = jest.fn().mockRejectedValue(error);

      await expect(getAdminByIdService.getAdminById(1)).rejects.toThrow('Unexpected error');
  });
});

describe('GetAdminsService', () => {
  let getAdminsService: GetAdminsService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      getAdminsService = new GetAdminsService(prismaMock);
  });

  it('should return a list of admins', async () => {
      const adminData = [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      ];
      prismaMock.adm.findMany = jest.fn().mockResolvedValue(adminData);

      const result = await getAdminsService.getAdmins();

      expect(prismaMock.adm.findMany).toHaveBeenCalledWith({});
      expect(result).toEqual(adminData);
  });

  it('should return an empty list when no admins are found', async () => {
      prismaMock.adm.findMany = jest.fn().mockResolvedValue([]);

      const result = await getAdminsService.getAdmins();

      expect(prismaMock.adm.findMany).toHaveBeenCalledWith({});
      expect(result).toEqual([]);
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.adm.findMany = jest.fn().mockRejectedValue(error);

      await expect(getAdminsService.getAdmins()).rejects.toThrow('Unexpected error');
  });
});

describe('PatchAdmService', () => {
  let patchAdmService: PatchAdmService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      patchAdmService = new PatchAdmService(prismaMock);
  });

  it('should update an admin successfully', async () => {
      const updates = { name: 'John Smith', email: 'john.smith@example.com' };
      const updatedAdm = { id: 1, ...updates };
      prismaMock.adm.update = jest.fn().mockResolvedValue(updatedAdm);

      const result = await patchAdmService.patchAdm(1, updates);

      expect(prismaMock.adm.update).toHaveBeenCalledWith({
          where: { id: 1 },
          data: updates,
      });
      expect(result).toEqual(updatedAdm);
  });

  it('should throw an error when admin not found', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.adm.update = jest.fn().mockRejectedValue(error);

      await expect(patchAdmService.patchAdm(999, { name: 'New Name' })).rejects.toThrow('Adm not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.adm.update = jest.fn().mockRejectedValue(error);

      await expect(patchAdmService.patchAdm(1, { name: 'New Name' })).rejects.toThrow('Unexpected error');
  });
});

jest.mock('../main/utils/BcryptUtil', () => {
  return {
      BcryptUtils: {
          hashPassword: jest.fn(),
      },
  };
});

describe('UpdateAdmService', () => {
  let updateAdmService: UpdateAdmService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
      prismaMock = new PrismaClient();
      updateAdmService = new UpdateAdmService(prismaMock);
  });

  it('should update an admin successfully', async () => {
      const id = 1;
      const name = 'John Doe';
      const email = 'john@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';

      (BcryptUtils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
      
      const updatedAdm = { id, name, email, password: hashedPassword };
      prismaMock.adm.update = jest.fn().mockResolvedValue(updatedAdm);

      const result = await updateAdmService.updateAdm(id, name, email, password);

      expect(BcryptUtils.hashPassword).toHaveBeenCalledWith(password);
      expect(prismaMock.adm.update).toHaveBeenCalledWith({
          where: { id },
          data: { name, email, password: hashedPassword },
      });
      expect(result).toEqual(updatedAdm);
  });

  it('should throw an error when admin not found', async () => {
      const error = new PrismaClientKnownRequestError('Record not found.', {code: 'P2025', clientVersion: '1'});
      prismaMock.adm.update = jest.fn().mockRejectedValue(error);

      await expect(updateAdmService.updateAdm(999, 'New Name', 'new@example.com', 'newPassword')).rejects.toThrow('Adm not found.');
  });

  it('should rethrow unexpected errors', async () => {
      const error = new Error('Unexpected error');
      prismaMock.adm.update = jest.fn().mockRejectedValue(error);

      await expect(updateAdmService.updateAdm(1, 'New Name', 'new@example.com', 'newPassword')).rejects.toThrow('Unexpected error');
  });
});