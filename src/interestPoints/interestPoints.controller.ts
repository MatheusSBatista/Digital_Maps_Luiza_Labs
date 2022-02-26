import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InterestPointsService } from './interestPoints.service';
import { InterestPoints } from './interestPoints.entity'
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery,ApiBody } from '@nestjs/swagger';
import { InterestPointsCreateDto } from './dto/interestPoint.create.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { InterestPointsFindAroundDto } from './dto/InterestPoints-around.find.dto';
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

  @Post()
  @ApiBody({ type: InterestPointsCreateDto })
  @ApiOperation({ summary: 'Cadastrar novos Pontos de Interesse' })
  @ApiResponse({ status: 201, description: 'Registro inserido com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de inserir o registro' })
  async create(@Body() data: InterestPointsCreateDto): Promise<ResponseDto> {
    return this.interestPointsService.create(data);
  }

  @Get('around/:latitude/:longitude/:meters')
  @ApiOperation({ summary: 'Listar todos Pontos de Interesse próximos a você' })
  @ApiResponse({ status: 200, description: 'Listagem dos Pontos de Interesse realizadado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de buscar o registro' })
  @ApiParam({ name: "latitude" })
  @ApiParam({ name: "longitude" })
  @ApiParam({ name: "meters" })
  async findAllAround(@Param('latitude') latitude: number, @Param('longitude') longitude: number,@Param('meters') meters: number): Promise<InterestPoints[]> {
    return this.interestPointsService.findAllAround(latitude,longitude,meters);
  }

}
