import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InterestPoints } from './interestPoints.entity';

@Injectable()
export class InterestPointsService {
  constructor(
    @Inject('INTEREST_POINTS_REPOSITORY')
    private interestPointsRepository: Repository<InterestPoints>,
  ) {}

  async findAll(): Promise<InterestPoints[]> {
    return this.interestPointsRepository.find();
  }
}