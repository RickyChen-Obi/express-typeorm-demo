import { PolicyholderController } from '@/controllers/policyholder.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import Container from 'typedi';
import { ValidateQueryMiddleware, ValidateParamMiddleware } from '@middlewares/validation.middleware';
import { GetPolicyholderDto } from '@/dtos/policyholders.dto';

export class PolicyholderRoute implements Routes {
  public path = '/api/policyholders';
  public router = Router();

  private policyholder = Container.get(PolicyholderController);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidateQueryMiddleware(GetPolicyholderDto), this.policyholder.getPolicyholder);
    this.router.get(`${this.path}/:code/top`, ValidateParamMiddleware(GetPolicyholderDto), this.policyholder.getPolicyholderTop);
  }
}
