import { Module } from '@nestjs/common';
import {InterestPointsModule } from './interestPoints/interestPoints.module';
@Module({
  imports: [InterestPointsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
