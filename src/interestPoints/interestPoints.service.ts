import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository } from 'typeorm';
import { InterestPointsCreateDto } from './dto/interestPoint.create.dto';
import { InterestPointsFindAroundDto } from './dto/InterestPoints-around.find.dto';
import { UpdateInterestPointsDto } from './dto/interestPoints-update-dto';
import { InterestPoints } from './interestPoints.entity';

@Injectable()
export class InterestPointsService {
  constructor(
    @InjectRepository(InterestPoints)
    private interestPointsRepository: Repository<InterestPoints>,
  ) { }

  async findAll(): Promise<InterestPoints[]> {
    return this.interestPointsRepository.find();
  }

  async create(data: InterestPointsCreateDto) {
    let interestPoint = new InterestPoints();

    interestPoint.name = data.name;
    interestPoint.open = data.open;
    interestPoint.close = data.close;
    interestPoint.latitude = data.latitude;
    interestPoint.longitude = data.longitude;

    if (interestPoint.latitude < 0) {
      throw new HttpException('Valor de Latitude(X) deve ser inteiro e maior que 0!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (interestPoint.longitude < 0) {
      throw new HttpException('Valor de Longitude(Y) deve ser inteiro e maior que 0!', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.interestPointsRepository.save(interestPoint).then(async response => {
      return <ResponseDto>{
        status: true,
        message: "Ponto de interesse cadastrado com sucesso!"
      }
    }).catch(error => {
      throw new HttpException('Houve algum erro para cadastrar ponto de interesse!', HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  async findAllAround(latitude, longitude, meters, hours): Promise<InterestPointsFindAroundDto[]> {
    let allInterestPoints = await this.interestPointsRepository.find();
    let isAround = [];
    for (let index in allInterestPoints) {
      if ((longitude - allInterestPoints[index].longitude) * (longitude - allInterestPoints[index].longitude) +
        (latitude - allInterestPoints[index].latitude) * (latitude - allInterestPoints[index].latitude) <= meters * meters) {
        let response = new InterestPointsFindAroundDto();
        response.name = allInterestPoints[index].name;
        if (allInterestPoints[index].close > hours || allInterestPoints[index].close == '') {
          response.isOpen = 'ABERTO'
        } else {
          response.isOpen = 'FECHADO'
        }
        isAround.push(response)
      }
    }
    return isAround;
  }

  async update(interestPointsId: number, dtoUpdate: UpdateInterestPointsDto) {

    const response = await this.findOneOrFail(interestPointsId);

    this.interestPointsRepository.merge(response, dtoUpdate);
    return await this.interestPointsRepository.save(response).catch(error => {
      throw new HttpException('Houve algum erro para alterar ponto de interesse!', HttpStatus.INTERNAL_SERVER_ERROR);
    });;
  }

  async delete(interestPointsId: number) {
    await this.findOneOrFail(interestPointsId);
    return await this.interestPointsRepository.delete(interestPointsId).then(async response => {
      return <ResponseDto>{
        status: true,
        message: "Ponto de interesse deletado com sucesso!"
      }
    }).catch(error => {
      throw new HttpException('Houve algum erro para deletar ponto de interesse!', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.interestPointsRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('Registro não encontrado!');
    }
  }

}
