import { Connection } from 'typeorm';
import { interestPoints } from './interestPoints.entity';

export const interestPointsProviders = [
  {
    provide: 'INTEREST_POINTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(interestPoints),
    inject: ['DATABASE_CONNECTION'],
  },
];