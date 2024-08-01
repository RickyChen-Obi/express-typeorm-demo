import { PolicyholdersEntity } from '@/entities/policyholders.entity';
import { getRepository, MigrationInterface } from 'typeorm';

export class policyholderTestData1722449269775 implements MigrationInterface {
  public async up(): Promise<void> {
    const policyholdersRepository = getRepository(PolicyholdersEntity);

    // Helper function to find or create a policyholder by name
    async function findOrCreatePolicyholder(name: string): Promise<PolicyholdersEntity> {
      let policyholder = await policyholdersRepository.findOne({ where: { name } });
      if (!policyholder) {
        policyholder = policyholdersRepository.create({ name });
        await policyholdersRepository.save(policyholder);
      }
      return policyholder;
    }

    async function findOrCreateA(): Promise<PolicyholdersEntity> {
      let policyholder = await policyholdersRepository.findOne({ where: { code: '19b00130-99e7-439d-96fd-3c4eee11660a' } });
      if (!policyholder) {
        policyholder = policyholdersRepository.create({ code: '19b00130-99e7-439d-96fd-3c4eee11660a', name: 'A' });
        await policyholdersRepository.save(policyholder);
      }
      return policyholder;
    }

    // Find or create policyholders A, B, and C
    const policyholderA = await findOrCreateA();
    const policyholderB = await findOrCreatePolicyholder('B');
    const policyholderC = await findOrCreatePolicyholder('C');
    const policyholderD = await findOrCreatePolicyholder('D');
    const policyholderE = await findOrCreatePolicyholder('E');
    const policyholderF = await findOrCreatePolicyholder('F');
    const policyholderG = await findOrCreatePolicyholder('G');
    const policyholderH = await findOrCreatePolicyholder('H');
    const policyholderI = await findOrCreatePolicyholder('I');
    const policyholderJ = await findOrCreatePolicyholder('J');
    const policyholderK = await findOrCreatePolicyholder('K');
    const policyholderL = await findOrCreatePolicyholder('L');
    const policyholderM = await findOrCreatePolicyholder('M');
    const policyholderN = await findOrCreatePolicyholder('N');
    const policyholderO = await findOrCreatePolicyholder('O');
    const policyholderP = await findOrCreatePolicyholder('P');
    const policyholderQ = await findOrCreatePolicyholder('Q');
    const policyholderR = await findOrCreatePolicyholder('R');
    const policyholderS = await findOrCreatePolicyholder('S');

    // Set up the relationships
    policyholderB.parent = policyholderA;
    policyholderB.introducer_code = policyholderA.code;
    policyholderC.parent = policyholderA;
    policyholderC.introducer_code = policyholderA.code;
    policyholderD.parent = policyholderA;
    policyholderD.introducer_code = policyholderA.code;
    policyholderE.parent = policyholderA;
    policyholderE.introducer_code = policyholderA.code;
    policyholderF.parent = policyholderA;
    policyholderF.introducer_code = policyholderA.code;
    policyholderG.parent = policyholderA;
    policyholderG.introducer_code = policyholderA.code;

    policyholderH.parent = policyholderB;
    policyholderH.introducer_code = policyholderB.code;
    policyholderI.parent = policyholderB;
    policyholderI.introducer_code = policyholderB.code;
    policyholderJ.parent = policyholderB;
    policyholderJ.introducer_code = policyholderB.code;
    policyholderK.parent = policyholderB;
    policyholderK.introducer_code = policyholderB.code;

    policyholderL.parent = policyholderC;
    policyholderL.introducer_code = policyholderC.code;
    policyholderM.parent = policyholderC;
    policyholderM.introducer_code = policyholderC.code;
    policyholderN.parent = policyholderC;
    policyholderN.introducer_code = policyholderC.code;
    policyholderO.parent = policyholderC;
    policyholderO.introducer_code = policyholderC.code;

    policyholderP.parent = policyholderH;
    policyholderP.introducer_code = policyholderH.code;
    policyholderQ.parent = policyholderH;
    policyholderQ.introducer_code = policyholderH.code;
    policyholderR.parent = policyholderH;
    policyholderR.introducer_code = policyholderH.code;
    policyholderS.parent = policyholderH;
    policyholderS.introducer_code = policyholderH.code;

    const policyholders = [
      policyholderB,
      policyholderC,
      policyholderD,
      policyholderE,
      policyholderF,
      policyholderG,
      policyholderH,
      policyholderI,
      policyholderJ,
      policyholderK,
      policyholderL,
      policyholderM,
      policyholderN,
      policyholderO,
      policyholderP,
      policyholderQ,
      policyholderR,
      policyholderS,
    ];

    await policyholdersRepository.save(policyholders);
  }
  public async down(): Promise<void> {
    const policyholdersRepository = getRepository(PolicyholdersEntity);

    const policyholderNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
    // Remove policyholders A to S
    for (const name of policyholderNames) {
      await policyholdersRepository.delete({ name });
    }
  }
}
