import { expect } from 'chai';
import sinon from 'sinon';
import { PrismaClient } from '@prisma/client';
import { CreateAdmService } from '../src/services/adm/CreateAdmService';
import { BcryptUtils } from '../main/utils/BcryptUtil';

// Mocks
const prismaMock = {
  adm: {
    create: sinon.stub(),
  },
} as unknown as PrismaClient;

describe('CreateAdmService', () => {
  let createAdmService: CreateAdmService;
  let bcryptHashStub: sinon.SinonStub;

  beforeEach(() => {
    createAdmService = new CreateAdmService();
    bcryptHashStub = sinon.stub(BcryptUtils, 'hashPassword');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create an admin successfully', async () => {
    // Arrange
    const name = 'Admin Name';
    const email = 'admin@example.com';
    const password = 'password123';
    const hashedPassword = 'hashedPassword123';

    bcryptHashStub.resolves(hashedPassword);
    (prismaMock.adm.create as sinon.SinonStub).resolves({ id: 1, name, email, password: hashedPassword });

    // Act
    const result = await createAdmService.createAdm(name, email, password);

    // Assert
    expect(bcryptHashStub.calledOnceWith(password)).to.be.true;
    expect((prismaMock.adm.create as sinon.SinonStub).calledOnceWith({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })).to.be.true;
    expect(result).to.deep.equal({ id: 1, name, email, password: hashedPassword });
  });

  it('should handle errors and return the error', async () => {
    // Arrange
    const name = 'Admin Name';
    const email = 'admin@example.com';
    const password = 'password123';
    const error = new Error('Error creating admin');

    bcryptHashStub.rejects(error);

    // Act
    const result = await createAdmService.createAdm(name, email, password);

    // Assert
    expect(bcryptHashStub.calledOnceWith(password)).to.be.true;
    expect(result).to.equal(error);
  });
});
