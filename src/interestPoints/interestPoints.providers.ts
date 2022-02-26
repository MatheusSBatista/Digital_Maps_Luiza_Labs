import { Connection } from 'typeorm';
import { InterestPoints } from './interestPoints.entity';

export const interestPointsProviders = [
  {
    provide: 'INTEREST_POINTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(InterestPoints),
    inject: ['DATABASE_CONNECTION'],
  },
];