import 'reflect-metadata';
import { PolicyholdersService } from '@/services/policyholders.service';
import { PolicyholdersEntity } from '@/entities/policyholders.entity';
import { Repository, TreeRepository } from 'typeorm';
import { rootPolicyholder, rootPolicyholderDescendentTree, rootPolicyholderSeparateTree } from './mockdata/policyholders.mockdata';
import { HttpException } from '@/exceptions/HttpException';

// mockRepository.ts
const mockRepository = {
  findOne: jest.fn().mockImplementation(({ where: { code } }) => {
    switch (code) {
      case '19b00130-99e7-439d-96fd-3c4eee11660a':
        return rootPolicyholder;
      case '031c8476-3239-4125-b245-d837375fdc1c':
        return rootPolicyholderDescendentTree.children[0];
      default:
        return undefined;
    }
  }),
} as unknown as jest.Mocked<Repository<PolicyholdersEntity>>;

export const mockTreeRepositoryFactory = {
  findDescendantsTree: () => rootPolicyholderDescendentTree,
} as unknown as TreeRepository<PolicyholdersEntity>;

describe('PolicyholderService', () => {
  let service: PolicyholdersService;
  // let connection: Connection;

  beforeAll(async () => {
    // connection = await dbConnection();
    service = new PolicyholdersService(mockTreeRepositoryFactory, mockRepository);
  });
  afterAll(async () => {
    // await connection.close();
  });

  it('should find an policyholder', async () => {
    // (mockRepository.findOne as jest.Mock).mockReturnValueOnce(rootPolicyholder);
    const result = await service.findPolicyholderByCode('19b00130-99e7-439d-96fd-3c4eee11660a');
    expect(result).toEqual(rootPolicyholder);
  });

  it('should find policyholder with a list of introducee', async () => {
    const result = await service.findPolicyholderWithIntroducee('19b00130-99e7-439d-96fd-3c4eee11660a');
    expect(result).toEqual(rootPolicyholderSeparateTree);
  });

  it('should find the top of policyholder with a list of introducee', async () => {
    const result = await service.findTopByCodeWithIntroducee('031c8476-3239-4125-b245-d837375fdc1c');
    expect(result).toEqual(rootPolicyholderSeparateTree);
  });

  it('to find top but should throw 404 User does not exist', async () => {
    await expect(service.findTopByCodeWithIntroducee('00000000-99e7-439d-96fd-3c4eee11660a')).rejects.toThrow(
      new HttpException(404, 'User does not exist.'),
    );
  });

  it('should throw 404 User does not exist', async () => {
    await expect(service.findPolicyholderWithIntroducee('00000000-99e7-439d-96fd-3c4eee11660a')).rejects.toThrow(
      new HttpException(404, 'User does not exist.'),
    );
  });

  it('should return User does not have a introducer', async () => {
    (mockRepository.findOne as jest.Mock).mockReturnValueOnce(rootPolicyholder);

    await expect(service.findTopByCodeWithIntroducee('19b00130-99e7-439d-96fd-3c4eee11660a')).rejects.toThrow(
      new HttpException(404, 'User does not have a introducer.'),
    );
  });
});
