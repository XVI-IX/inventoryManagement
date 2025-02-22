import { Logger, NotFoundException } from '@nestjs/common';
import { IPermissionsRepository } from '../../domain/repositories/rbac.repository';
import { Permissions } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class GetPermissionByNameOrIdUseCase {
  private readonly logger: Logger;

  constructor(private readonly permissionsRepository: IPermissionsRepository) {
    this.logger = new Logger(GetPermissionByNameOrIdUseCase.name);
  }

  async execute(name?: string, permissionId?: string): Promise<Permissions> {
    try {
      let permission: Permissions;
      if (name && permissionId) {
        permission = await this.permissionsRepository.findOne({
          where: {
            name,
            id: permissionId,
          },
        });

        if (!permission) {
          throw new NotFoundException(
            'Permission with name and id provided not found',
          );
        }
      } else if (name && !permissionId) {
        permission = await this.permissionsRepository.findOne({
          where: {
            name,
          },
        });

        if (!permission) {
          throw new NotFoundException(
            'Permission with name could not be retrieved',
          );
        }
      } else if (!name && permissionId) {
        permission = await this.permissionsRepository.findOne({
          where: {
            id: permissionId,
          },
        });

        if (!permission) {
          throw new NotFoundException(
            'Permission with Id provided could not be found',
          );
        }
      }

      return permission;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
