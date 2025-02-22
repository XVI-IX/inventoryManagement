import { BadRequestException, Logger } from '@nestjs/common';
import { IPermissionsRepository } from '../../domain/repositories/rbac.repository';
import { Permissions } from '@app/lib/infrastructure/services/database/entities/rbac.entity';

export class GetAllPermissionsUseCase {
  private readonly logger: Logger;
  constructor(private readonly permissionsRepository: IPermissionsRepository) {
    this.logger = new Logger(GetAllPermissionsUseCase.name);
  }

  async execute(): Promise<Permissions[]> {
    try {
      const permissions = await this.permissionsRepository.find({});

      if (!permissions) {
        throw new BadRequestException('Permissions could not be retrieved');
      }

      return permissions;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
