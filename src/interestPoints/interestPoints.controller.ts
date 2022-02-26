import { Controller, Get } from '@nestjs/common';
import { InterestPointsService } from './interestPoints.service';
import {InterestPoints} from './interestPoints.entity'
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
@Controller('interestPoints')
export class InterestPointsController {
  constructor(private readonly interestPointsService: InterestPointsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos Pontos de Interesse' })
  @ApiResponse({ status: 200, description: 'Listagem dos Pontos de Interesse realizadado com sucesso.'})
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de buscar o registro' })
  async findAll(): Promise<InterestPoints[]> {
    return this.interestPointsService.findAll();
  }
}
