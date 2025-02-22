import { Logger, NotFoundException } from "@nestjs/common";
import { IPermissionsRepository, IRolesRepository } from "../../domain/repositories/rbac.repository";
import { Roles } from "@app/lib/infrastructure/services/database/entities/rbac.entity";

export class GetAllRolesWithPermissionUseCase {
  private readonly logger: Logger
  constructor(
    private readonly roleRepository: IRolesRepository,
    private readonly permissionRepository: IPermissionsRepository
  ) {
    this.logger = new Logger(GetAllRolesWithPermissionUseCase.name)
  }

  async execute(permissionId: string): Promise<Roles[]> {
    try {
      const permissionExists = await this.permissionRepository.findOne({
        where: {
          id: permissionId
        }
      })

      if (!permissionExists) {
        throw new NotFoundException("Permission not found")
      }

      const rolesWithPermission = await this.
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}