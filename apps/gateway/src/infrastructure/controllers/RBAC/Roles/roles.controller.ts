import { Roles } from '@app/lib/infrastructure/services/database/entities/rbac.entity';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('v1/roles')
export class RoleGatewayController {
  constructor(
    @Inject('RBAC_SERVICE') private readonly roleService: ClientProxy,
  ) {}

  @Get()
  async getAllRoles(@Query() qObj: { permissionName: string }) {
    if (qObj && qObj?.permissionName) {
      return this.roleService.send('getAllRolesWithPermission', qObj);
    }
    return this.roleService.send('getAllRoles', {});
  }

  @Get('/:roleName/users')
  async getAllRoleUsers(@Param('roleName') roleName: string) {
    return this.roleService.send('getAllRoleUsers', { roleName });
  }

  @Get('/:roleId')
  async getRoleById(@Param('roleId') roleId: string) {
    return this.roleService.send('getRoleById', { roleId });
  }

  @Put('/:roleId')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() data: Partial<Roles>,
  ) {
    return this.roleService.send('updateRole', data);
  }
}
