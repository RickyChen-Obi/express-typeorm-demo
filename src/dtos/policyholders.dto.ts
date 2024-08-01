import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPolicyholderDto {
  @IsUUID()
  @IsNotEmpty()
  public code: string;
}
