import { GetPolicyholdersRequest, PolicyholdersWithIntroducee } from '@/interfaces/policyholders.interface';
import { PolicyholdersService } from '@/services/policyholders.service';
import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export class PolicyholderController {
  constructor(
    @Inject(() => PolicyholdersService)
    private policyholder: PolicyholdersService,
  ) {}
  public getPolicyholder = async (req: GetPolicyholdersRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code } = req.query;
      const foundPolicyholder: PolicyholdersWithIntroducee = await this.policyholder.findPolicyholderWithIntroducee(code);

      res.status(200).json(foundPolicyholder);
    } catch (error) {
      next(error);
    }
  };

  public getPolicyholderTop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { code } = req.params;
      const foundPolicyholderTop: PolicyholdersWithIntroducee = await this.policyholder.findTopByCodeWithIntroducee(code);
      res.status(200).json(foundPolicyholderTop);
    } catch (error) {
      next(error);
    }
  };
}
