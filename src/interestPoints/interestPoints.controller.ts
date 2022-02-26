import { Controller, Get, Post, Body } from '@nestjs/common';
import { InterestPointsService } from './interestPoints.service';
import { InterestPoints } from './interestPoints.entity'
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery,ApiBody } from '@nestjs/swagger';
import { InterestPointsCreateDto } from './dto/interestPoint.create.dto';
import { ResponseDto } from 'src/dto/response.dto';
@Controller('interestPoints')
@ApiTags('Configuração de Pontos de Interesse')
export class InterestPointsController {
  constructor(private readonly interestPointsService: InterestPointsService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos Pontos de Interesse' })
  @ApiResponse({ status: 200, description: 'Listagem dos Pontos de Interesse realizadado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de buscar o registro' })
  async findAll(): Promise<InterestPoints[]> {
    return this.interestPointsService.findAll();
  }

  @Post('/cadastrar')
  @ApiBody({ type: InterestPointsCreateDto })
  @ApiOperation({ summary: 'Cadastrar novos Pontos de Interesse' })
  @ApiResponse({ status: 201, description: 'Registro inserido com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de inserir o registro' })
  async create(@Body() data: InterestPointsCreateDto): Promise<ResponseDto> {
    return this.interestPointsService.create(data);
  }

}
