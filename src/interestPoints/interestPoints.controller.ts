import { Controller, Get } from '@nestjs/common';
import { InterestPointsService } from './interestPoints.service';
import {InterestPoints} from './interestPoints.entity'
@Controller('interestPoints')
export class InterestPointsController {
  constructor(private readonly interestPointsService: InterestPointsService) {}

  @Get('/findall')
  async findAll(): Promise<InterestPoints[]> {
    return this.interestPointsService.findAll();
  }
}
