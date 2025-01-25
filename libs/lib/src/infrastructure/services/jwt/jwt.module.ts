import { Module } from '@nestjs/common';
import { JWTokenService } from './jwt.service';

@Module({
  imports: [],
  providers: [JWTokenService],
  exports: [JWTokenService],
})
export class JWTModule {}
