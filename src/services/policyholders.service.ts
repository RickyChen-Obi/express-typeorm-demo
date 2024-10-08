import { PolicyholdersEntity } from '@/entities/policyholders.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Policyholder, PolicyholderNodes, PolicyholdersWithIntroducee } from '@/interfaces/policyholders.interface';

import { Service } from 'typedi';
import { Repository, TreeRepository } from 'typeorm';

import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PolicyholdersService {
  constructor(
    @InjectRepository(PolicyholdersEntity)
    private readonly treeRepository: TreeRepository<PolicyholdersEntity>,
    @InjectRepository(PolicyholdersEntity)
    private readonly policyholdersRepository: Repository<PolicyholdersEntity>,
  ) {}

  public async findTopByCodeWithIntroducee(code: string, maxDepth = 4) {
    const policyholder = await this.findPolicyholderByCode(code);

    const { introducer_code: top_code } = policyholder;
    if (!top_code) throw new HttpException(404, 'User does not have a introducer.');
    const result = await this.findPolicyholderWithIntroducee(top_code, maxDepth);
    return result;
  }

  public async findPolicyholderWithIntroducee(code: string, maxDepth = 4): Promise<PolicyholdersWithIntroducee> {
    const policyholder = await this.findPolicyholderByCode(code);

    const list = await this.treeRepository.findDescendantsTree(policyholder, { depth: maxDepth });
    const { children } = list;
    const flattenTree = this.flattenPolicyholdersTree(children, [])
      .sort((a, b) => {
        return a.registration_date.getTime() - b.registration_date.getTime();
      })
      .slice(0, 14);
    const sparatedTree = this.separateTree(flattenTree);
    delete policyholder.children;

    return {
      ...policyholder,
      ...sparatedTree,
    };
  }

  public async findPolicyholderByCode(code: string): Promise<PolicyholdersEntity> {
    const policyholder = await this.policyholdersRepository.findOne({ where: { code } });
    if (!policyholder) throw new HttpException(404, 'User does not exist.');
    return policyholder;
  }

  private flattenPolicyholdersTree(policyholders: PolicyholdersEntity[], result: Policyholder[] = []): Policyholder[] {
    function flatten(policyholder: PolicyholdersEntity) {
      const { code, name, registration_date, introducer_code } = policyholder;
      result.push({ code, name, registration_date, introducer_code });

      policyholder.children.forEach(flatten);
    }

    policyholders.forEach(flatten);
    return result;
  }

  private separateTree(orderedList: Policyholder[]): PolicyholderNodes {
    if (!orderedList.length) return { l: [], r: [] };

    type ReducedResult = {
      left: Policyholder[];
      right: Policyholder[];
      treeLevel: number;
      maxLength: number;
    };

    const { left, right } = orderedList.reduce(
      (accu, curr) => {
        const { left, right, treeLevel, maxLength } = accu;

        if (left.length < maxLength) {
          left.push(curr);
        } else {
          right.push(curr);
        }

        if (right.length >= maxLength) {
          accu.maxLength += Math.pow(2, treeLevel);
          accu.treeLevel++;
        }
        return accu;
      },
      { left: [], right: [], treeLevel: 1, maxLength: 1 } as ReducedResult,
    );

    return { l: left, r: right };
  }
}
