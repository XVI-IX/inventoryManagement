import { Logger, NotFoundException } from '@nestjs/common';
import { IPermissionsRepository } from '../../domain/repositories/rbac.repository';

export class DeletePermissionUseCase {
  private readonly logger: Logger;

  constructor(private readonly permissionRepository: IPermissionsRepository) {
    this.logger = new Logger(DeletePermissionUseCase.name);
  }

  async execute(permissionId: string): Promise<boolean> {
    try {
      const permissionExists = await this.permissionRepository.findOne({
        where: {
          id: permissionId,
        },
      });

      if (!permissionExists) {
        throw new NotFoundException('Permission with Id not found');
      }

      await this.permissionRepository.delete({
        id: permissionId,
      });

      return true;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
