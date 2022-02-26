import { Injectable, Inject } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository } from 'typeorm';
import { InterestPointsCreateDto } from './dto/interestPoint.create.dto';
import { InterestPoints } from './interestPoints.entity';

@Injectable()
export class InterestPointsService {
  constructor(
    @Inject('INTEREST_POINTS_REPOSITORY')
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
      return <ResponseDto>{
        status: false,
        message: "Valor de Latitude(X) deve ser inteiro e maior que 0!"
      }
    }
    if (interestPoint.longitude < 0) {
      return <ResponseDto>{
        status: false,
        message: "Valor de Longitude(Y) deve ser inteiro e maior que 0!"
      }
    }

    return await this.interestPointsRepository.save(interestPoint).then(async response => {
      return <ResponseDto>{
        status: true,
        message: "Ponto de interesse cadastrado com sucesso!"
      }
    }).catch(error => {
      return <ResponseDto>{
        status: false,
        message: "Houve algum erro para cadastrar ponto de interesse!"
      }
    })

  }

}
