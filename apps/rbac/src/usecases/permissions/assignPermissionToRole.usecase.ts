import {
  BadRequestException,
  ConflictException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IPermissionsRepository,
  IRolesRepository,
} from '../../domain/repositories/rbac.repository';

export class AssignPermissionToRoleUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly rolesRepository: IRolesRepository,
    private readonly permissionRepository: IPermissionsRepository,
  ) {}

  async execute(roleId: string, permissionId: string) {
    try {
      const roleExists = await this.rolesRepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!roleExists) {
        throw new NotFoundException('Role not found');
      }

      const permissionExists = await this.permissionRepository.findOne({
        where: {
          id: permissionId,
        },
      });

      if (!permissionExists) {
        throw new NotFoundException('Permission not found');
      }

      if (
        roleExists.permissions.some((perm) => perm.id === permissionExists.id)
      ) {
        throw new ConflictException('Role already has permission');
      }
      const updatedPermissions = roleExists.permissions.push(permissionExists);
      const updatedRole = await this.rolesRepository.update(
        {
          id: roleId,
        },
        {
          permissions: updatedPermissions,
        },
      );

      if (!updatedRole) {
        throw new BadRequestException('Role could not be granted permission');
      }

      return updatedRole;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
