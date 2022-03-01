import { Controller, Get, Post, Body, Param, Put, HttpCode, Delete } from '@nestjs/common';
import { InterestPointsService } from './interestPoints.service';
import { InterestPoints } from './interestPoints.entity'
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { InterestPointsCreateDto } from './dto/interestPoint.create.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { InterestPointsFindAroundDto } from './dto/InterestPoints-around.find.dto';
import { UpdateInterestPointsDto } from './dto/interestPoints-update-dto';
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

  @Get('around/:latitude/:longitude/:meters/:hours')
  @ApiOperation({ summary: 'Listar todos Pontos de Interesse próximos a você' })
  @ApiResponse({ status: 200, description: 'Listagem dos Pontos de Interesse realizadado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de buscar o registro' })
  @ApiParam({ name: "latitude", example :'20' })
  @ApiParam({ name: "longitude", example :'10' })
  @ApiParam({ name: "meters", example :'10' })
  @ApiParam({ name: "hours", example :'10:00' })
  async findAllAround(@Param('latitude') latitude: number, @Param('longitude') longitude: number, @Param('meters') meters: number, @Param('hours') hours: string): Promise<InterestPointsFindAroundDto[]> {
    return this.interestPointsService.findAllAround(latitude, longitude, meters, hours);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Alterar Pontos de Interesse' })
  @ApiBody({ type: UpdateInterestPointsDto })
  @ApiResponse({ status: 200, description: 'Registro alterado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de alterar o registro' })
  @ApiParam({ name: 'id' })
  async update(@Param() id: number, @Body() updateDto: UpdateInterestPointsDto) {
    return await this.interestPointsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletar um pontode interesse' })
  @ApiResponse({ status: 204, description: 'Registro deletado.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de deletar o registro' })
  @ApiParam({ name: 'id' })
  async delete(@Param() id: number) {
    return await this.interestPointsService.delete(id);
  }


}
