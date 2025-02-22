import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { IRolesRepository } from '../../domain/repositories/rbac.repository';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class UpdateRoleUseCase {
  private readonly logger: Logger;
  constructor(private readonly roleRepository: IRolesRepository) {
    this.logger = new Logger(UpdateRoleUseCase.name);
  }

  async execute(roleId: string, entity: Partial<Roles>): Promise<Roles> {
    try {
      const roleExists = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!roleExists) {
        throw new NotFoundException('Role not found');
      }

      const updatedRole = await this.roleRepository.update(
        {
          id: roleId,
        },
        entity,
      );

      if (!updatedRole) {
        throw new BadRequestException('Role could not be updated');
      }

      return updatedRole;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
