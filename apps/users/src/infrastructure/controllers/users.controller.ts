import { ServiceInterface } from '@app/lib/domain/adapters';
import { Users } from '@app/lib/infrastructure/services/database/entities/user.entity';
import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersGeneralUseCaseProxyModule } from '../usecase-proxy/users.generalUseCaseProxy.module';
import { GetAllUsersUseCase } from '../../usecases/user_accounts/getAllUsers.usecase';
import { UseCaseProxy } from '@app/lib/infrastructure/usecase-proxy/usecase-proxy';
import { HttpResponse } from '@app/lib/infrastructure/helpers/response.helper';
import { GetUserByIdUseCase } from '../../usecases/user_accounts/getUserById.usecase';
import { UpdateUserInput } from '../common/schema/users.schema';
import { UpdateUserUseCase } from '../../usecases/user_accounts/updateUser.usecase';
import { DeleteUserUseCase } from '../../usecases/user_accounts/deleteUser.usecase';

@Controller()
export class UsersController {
  private readonly logger: Logger;
  constructor(
    @Inject(UsersGeneralUseCaseProxyModule.GET_ALL_USERS_USE_CASE_PROXY)
    private readonly getAllUsersUseCase: UseCaseProxy<GetAllUsersUseCase>,
    @Inject(UsersGeneralUseCaseProxyModule.GET_USER_BY_ID_USE_CASE_PROXY)
    private readonly getUserByIdUseCase: UseCaseProxy<GetUserByIdUseCase>,
    @Inject(UsersGeneralUseCaseProxyModule.UPDATE_USER_USE_CASE_PROXY)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UsersGeneralUseCaseProxyModule.DELETE_USER_USE_CASE_PROXY)
    private readonly deleteUserUseCase: UseCaseProxy<DeleteUserUseCase>,
  ) {}

  @MessagePattern('getAllUsers')
  async getAllUsers(): Promise<ServiceInterface<Users[]>> {
    try {
      const users = await this.getAllUsersUseCase.getInstance().getAllUsers();

      return HttpResponse.send('Users retrieved successfully', users);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @MessagePattern('getUserById')
  async getUserById(
    @Payload() data: { userId: string },
  ): Promise<ServiceInterface<Users>> {
    try {
      const user = await this.getUserByIdUseCase
        .getInstance()
        .getUserById(data.userId);

      return HttpResponse.send('User retrieved successfully', user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @MessagePattern('updateUser')
  async updateUser(
    @Payload() data: { userId: string; entity: UpdateUserInput },
  ): Promise<ServiceInterface<Users>> {
    try {
      const user = await this.updateUserUseCase
        .getInstance()
        .updateUser(data.userId, data.entity);

      return HttpResponse.send('User updated successfully', user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @MessagePattern('deleteUser')
  async deleteUser(@Payload() data: { userId: string }): Promise<any> {
    try {
      const deleteUser = await this.deleteUserUseCase
        .getInstance()
        .deleteUser(data.userId);

      return HttpResponse.send('User Deleted', deleteUser);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
