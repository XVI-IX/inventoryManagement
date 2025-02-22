import { BadRequestException, Logger } from '@nestjs/common';
import { IRolePermissionsRepository } from '../../domain/repositories/rbac.repository';
import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class GetRoleByIdUseCase {
  private readonly logger: Logger;
  constructor(private readonly roleRepository: IRolePermissionsRepository) {
    this.logger = new Logger(GetRoleByIdUseCase.name);
  }

  async execute(roleId: string): Promise<Roles> {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
      });

      if (!role) {
        throw new BadRequestException('Role could not be retreived');
      }

      return role;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
