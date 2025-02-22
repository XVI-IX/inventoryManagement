import { BadRequestException, Logger } from '@nestjs/common';
import { IPermissionsRepository } from '../../domain/repositories/rbac.repository';
import { Permissions } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class UpdatePermissonUseCase {
  private readonly logger: Logger;
  constructor(private readonly permissionsRepository: IPermissionsRepository) {
    this.logger = new Logger(UpdatePermissonUseCase.name);
  }

  async execute(
    permissionId: string,
    entity: Partial<Permissions>,
  ): Promise<Permissions> {
    try {
      const permission = await this.permissionsRepository.update(
        {
          id: permissionId,
        },
        {
          name: entity.name,
          description: entity.description,
        },
      );

      if (!permission) {
        throw new BadRequestException('Permission could not be updated');
      }

      return permission;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
