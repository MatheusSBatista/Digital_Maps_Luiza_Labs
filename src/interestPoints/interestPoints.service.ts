import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { interestPoints } from './interestPoints.entity';

@Injectable()
export class interestPointsService {
  constructor(
    @Inject('INTEREST_POINTS_REPOSITORY')
    private interestPointsRepository: Repository<interestPoints>,
  ) {}

  async findAll(): Promise<interestPoints[]> {
    return this.interestPointsRepository.find();
  }
}