import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { interestPointsProviders } from './interestPoints.providers';
import { interestPointsService } from './interestPoints.service';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        ...interestPointsProviders,
        interestPointsService
    ],
})
export class InterestPointsModule { }
