import { ServiceInterface } from '@app/lib/domain/adapters';
import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpResponse {
  static send<T = any>(message: string, data: ServiceInterface<T> | any) {
    return {
      status: true,
      message: message ? message : 'Success',
      data: data ? data : null,
    };
  }

  static error(
    code: string,
    message: string,
    context: Record<string, unknown>,
  ) {
    const data = {
      status: false,
      message,
      data: context,
    };

    throw new HttpException(data, HttpStatus[code]);
  }
}
