import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { interestPointsProviders } from './interestPoints.providers';
import { InterestPointsService } from './interestPoints.service';
import { InterestPointsController } from './interestPoints.controller';
@Module({
    imports: [DatabaseModule],
    controllers: [InterestPointsController],
    providers: [
        ...interestPointsProviders,
        InterestPointsService
    ],
})
export class InterestPointsModule { }
