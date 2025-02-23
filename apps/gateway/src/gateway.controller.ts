import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Public } from '@app/lib/infrastructure/decorators';

@Controller('v1')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/health')
  @Public()
  getHealth(): any {
    return {
      message: 'healthy',
    };
  }
}
