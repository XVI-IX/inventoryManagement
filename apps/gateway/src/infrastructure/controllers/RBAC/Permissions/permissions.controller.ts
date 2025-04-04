import { Public } from '@app/lib/infrastructure/decorators';
import { Permissions } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('v1/permissions')
export class PermissionsGatewayController {
  constructor(
    @Inject('RBAC_SERVICE') private readonly rbacService: ClientProxy,
  ) {}

  @Get()
  @Public()
  async getAllPermissions(
    @Query() qObj: { name: string; permissionId: string },
  ) {
    if (qObj && (qObj?.name || qObj?.permissionId)) {
      return this.rbacService.send('getPermissionByNameOrId', qObj);
    }
    return this.rbacService.send('getAllPermissions', {});
  }

  @Delete('/:permissionId')
  async deletePermission(@Param('permissionId') permissionId: string) {
    return this.rbacService.send('deletePermission', { permissionId });
  }

  @Put('/:permissionId')
  async updatePermission(
    @Param('permissionId') permissionId: string,
    @Body() data: Partial<Permissions>,
  ) {
    return this.rbacService.send('updatePermission', { permissionId, data });
  }

  @Put('/:permissionId/assign')
  async assignPermissionToRole(
    @Param('permissionId') permissionId: string,
    @Body() data: { roleId: string },
  ) {
    return this.rbacService.send('assignPermissionToRole', {
      roleId: data.roleId,
      permissionId,
    });
  }
}
