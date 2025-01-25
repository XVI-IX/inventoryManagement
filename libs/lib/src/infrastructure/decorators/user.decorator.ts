import { IJwtPayload } from '@app/lib/domain/adapters';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @name GetAuthUser
 * @description Decorator to get the authenticated user
 *
 * @param data - Data
 * @param context - Context
 */
export const GetAuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IJwtPayload => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    return req.user;
  },
);
