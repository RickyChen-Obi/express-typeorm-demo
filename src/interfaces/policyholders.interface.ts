import { Request } from 'express';

export interface Policyholder {
  code: string;
  name: string;
  registration_date: Date;
  introducer_code: string;
}

export interface PolicyholderNodes {
  l: Policyholder[] | [];
  r: Policyholder[] | [];
}

export interface PolicyholdersWithIntroducee extends Policyholder, PolicyholderNodes {}

export interface GetPolicyholdersRequest extends Request {
  query: {
    code: string;
  };
}
