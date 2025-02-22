import { IUserRepository } from 'apps/users/src/domain/repositories/users.repository';
import { IRolesRepository } from '../../domain/repositories/rbac.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';

export class GetUsersWithRoleUseCase {
  private readonly logger: Logger;
  constructor(
    private readonly roleRepository: IRolesRepository,
    private readonly userRepository: IUserRepository,
  ) {
    this.logger = new Logger(GetUsersWithRoleUseCase.name);
  }

  async execute(roleName: string): Promise<Users[]> {
    try {
      const roleExists = await this.roleRepository.findOne({
        where: {
          name: roleName,
        },
      });

      if (!roleExists) {
        throw new NotFoundException('Role not found');
      }

      const roleUsers = await this.userRepository.find({
        where: {
          role: {
            id: roleExists.id,
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
