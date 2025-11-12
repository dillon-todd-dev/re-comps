import { IsString } from 'class-validator';

export class GetInvitationDto {
  @IsString()
  token: string;
}
