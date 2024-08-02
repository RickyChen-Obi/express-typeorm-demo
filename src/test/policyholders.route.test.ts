import 'reflect-metadata';
import { PolicyholdersService } from '@/services/policyholders.service';
import { PolicyholdersEntity } from '@/entities/policyholders.entity';
import { TreeRepository } from 'typeorm';
import { rootPolicyholder, rootPolicyholderDescendentTree } from './mockdata/policyholders.mockdata';
import { HttpException } from '@/exceptions/HttpException';
import Container from 'typedi';
import { PolicyholderController } from '@/controllers/policyholder.controller';
import request from 'supertest';
import { App } from '@/app';
import { PolicyholderRoute } from '@/routes/policyholder.route';

const mockService = {
  findPolicyholderWithIntroducee: jest.fn().mockImplementation(code => {
    switch (code) {
      case '19b00130-99e7-439d-96fd-3c4eee11660a':
        return rootPolicyholder;
      case '031c8476-3239-4125-b245-d837375fdc1c':
        return rootPolicyholderDescendentTree.children[0];
      default:
        throw new HttpException(404, 'User does not exist.');
    }
  }),
  findTopByCodeWithIntroducee: jest.fn().mockImplementation(code => {
    switch (code) {
      case '19b00130-99e7-439d-96fd-3c4eee11660a':
        throw new HttpException(404, 'User does not exist.');
      case '031c8476-3239-4125-b245-d837375fdc1c':
        return rootPolicyholderDescendentTree;
      default:
        return undefined;
    }
  }),
} as unknown as jest.Mocked<PolicyholdersService>;

export const mockTreeRepositoryFactory = {
  findDescendantsTree: () => rootPolicyholderDescendentTree,
} as unknown as TreeRepository<PolicyholdersEntity>;

describe('PolicyholderService', () => {
  beforeAll(async () => {
    const controller = new PolicyholderController(mockService);
    Container.set(PolicyholderController, controller);
  });

  it('should find a policyholder', async () => {
    const policyholdersRoute = new PolicyholderRoute();
    const app = new App([policyholdersRoute]);
    return request(app.getServer()).get(`${policyholdersRoute.path}`).query({ code: '19b00130-99e7-439d-96fd-3c4eee11660a' }).expect(200);
  });

  it('should not find a policyholder but return 404', async () => {
    const policyholdersRoute = new PolicyholderRoute();
    const app = new App([policyholdersRoute]);
    return request(app.getServer()).get(`${policyholdersRoute.path}`).query({ code: '00000000-99e7-439d-96fd-3c4eee11660a' }).expect(404);
  });

  it('should find an policyholder top', async () => {
    const policyholdersRoute = new PolicyholderRoute();
    const app = new App([policyholdersRoute]);
    return request(app.getServer()).get(`${policyholdersRoute.path}/031c8476-3239-4125-b245-d837375fdc1c/top`).expect(200);
  });

  it('should not find an policyholder top but return 404', async () => {
    const policyholdersRoute = new PolicyholderRoute();
    const app = new App([policyholdersRoute]);
    return request(app.getServer()).get(`${policyholdersRoute.path}/19b00130-99e7-439d-96fd-3c4eee11660a/top`).expect(404);
  });

  it('should not find an policyholder top but return 400', async () => {
    const policyholdersRoute = new PolicyholderRoute();
    const app = new App([policyholdersRoute]);
    return request(app.getServer()).get(`${policyholdersRoute.path}/-439d-96fd-3c4eee11660a/top`).expect(400);
  });
});
