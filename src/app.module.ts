import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {InterestPointsModule } from './interestPoints/interestPoints.module';
@Module({
  imports: [InterestPointsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
