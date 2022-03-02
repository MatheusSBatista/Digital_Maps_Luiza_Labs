import { Module } from '@nestjs/common';
import { InterestPointsService } from './interestPoints.service';
import { InterestPointsController } from './interestPoints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {InterestPoints} from '../interestPoints/interestPoints.entity'
@Module({
    imports: [TypeOrmModule.forFeature([InterestPoints])],
    controllers: [InterestPointsController],
    providers: [
        InterestPointsService
    ],
})
export class InterestPointsModule { }
