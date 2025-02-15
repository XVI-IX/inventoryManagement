import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleInput {
  name: string;
  permissions: {
    users: {
      canCreate: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      canActivate: boolean;
      canViewFullProfile: boolean;
    };
  };
}

export class CreatePermissionInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
