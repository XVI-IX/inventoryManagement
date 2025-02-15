import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('v1')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/health')
  getHealth(): any {
    return {
      message: 'healthy',
    };
  }
}
