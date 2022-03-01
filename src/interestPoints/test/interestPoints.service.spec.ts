import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterestPointsCreateDto } from '../dto/interestPoint.create.dto';
import { UpdateInterestPointsDto } from '../dto/interestPoints-update-dto';
import { InterestPoints } from '../interestPoints.entity';
import { InterestPointsService } from '../interestPoints.service';
import { MockInterestPoints, MockInterestPointsFindAroundDto, MockNewInterestPoint, mockResponseCreate, mockResponseDelete, MockUpdateInterestPoint } from './mocks/interestPoints.mock'

describe('InterestPointsService', () => {
    let interestPointsService: InterestPointsService;
    let interestPointsRepository: Repository<InterestPoints>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InterestPointsService,
                {
                    provide: getRepositoryToken(InterestPoints),
                    useValue: {
                        find: jest.fn().mockResolvedValue(MockInterestPoints),
                        save: jest.fn().mockResolvedValue(mockResponseCreate),
                        update: jest.fn().mockResolvedValue(MockUpdateInterestPoint),
                        delete: jest.fn().mockResolvedValue(mockResponseDelete),
                        merge: jest.fn().mockResolvedValue(MockUpdateInterestPoint),
                        findOneOrFail: jest.fn().mockResolvedValue(MockInterestPoints[0]),
                    },
                }
            ],
        }).compile();

        interestPointsService = module.get<InterestPointsService>(InterestPointsService);
        interestPointsRepository = module.get<Repository<InterestPoints>>(
            getRepositoryToken(InterestPoints),
        );
    });

    describe('Service defined', () => {
        it('should be defined', () => {
            expect(interestPointsService).toBeDefined();
            expect(interestPointsRepository).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should return a interest points list', async () => {
            const response = await interestPointsService.findAll();

            expect(response).toEqual(MockInterestPoints);
            expect(interestPointsRepository.find).toHaveBeenCalledTimes(1);

        });

        it('should throw an exception', () => {
            jest.spyOn(interestPointsRepository, 'find').mockRejectedValueOnce(new Error());
            expect(interestPointsService.findAll()).rejects.toThrowError();
        });
    });

    describe('findOneOrFail', () => {
        it('should return a interest point', async () => {
            const response = await interestPointsService.findOneOrFail(1);

            expect(response).toEqual(MockInterestPoints[0]);
            expect(interestPointsRepository.findOneOrFail).toHaveBeenCalledTimes(1);
        });

        it('should throw a not found exception', () => {
            jest.spyOn(interestPointsRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());
            expect(interestPointsService.findOneOrFail(1)).rejects.toThrowError(NotFoundException,);
        });
    });

    describe('update', () => {
        it('should update a interest point', async () => {
            const data: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            };

            jest.spyOn(interestPointsRepository, 'save').mockResolvedValueOnce(MockUpdateInterestPoint);

            const result = await interestPointsService.update(1, data);

            expect(result).toEqual(MockUpdateInterestPoint);
        });

        it('should throw a not found exception', () => {
            jest
                .spyOn(interestPointsRepository, 'findOneOrFail')
                .mockRejectedValueOnce(new Error());

            const data: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            };

            expect(interestPointsService.update(1, data)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should throw an exception', () => {
            jest.spyOn(interestPointsRepository, 'save').mockRejectedValueOnce(new Error());

            const data: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            };

            expect(interestPointsService.update(1, data)).rejects.toThrowError();
        });
    });

    describe('delete', () => {
        it('should delete a interest point', async () => {
            const result = await interestPointsService.delete(1);

            expect(result).toEqual(mockResponseDelete);
            expect(interestPointsRepository.findOneOrFail).toHaveBeenCalledTimes(1);
            expect(interestPointsRepository.delete).toHaveBeenCalledTimes(1);
        });

        it('should throw a not found exception', () => {
            jest.spyOn(interestPointsRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

            expect(interestPointsService.delete(1)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should throw an exception', () => {
            jest.spyOn(interestPointsRepository, 'delete').mockRejectedValueOnce(new Error());
            expect(interestPointsService.delete(1)).rejects.toThrowError();
        });
    });

    describe('create', () => {
        it('should create a new interest point', async () => {
            const data: InterestPointsCreateDto = {
                name: "Restaurante",
                latitude: 27,
                longitude: 12,
                open: "12:00",
                close: "18:00"
            };

            const result = await interestPointsService.create(data);

            expect(result).toEqual(mockResponseCreate);
            expect(interestPointsRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            const data: InterestPointsCreateDto = {
                name: "Restaurante",
                latitude: 27,
                longitude: 12,
                open: "12:00",
                close: "18:00"
            };

            jest.spyOn(interestPointsRepository, 'save').mockRejectedValueOnce(new Error());
            expect(interestPointsService.create(data)).rejects.toThrowError();
        });

        it('should throw an exception longitude negative', () => {
            const data: InterestPointsCreateDto = {
                name: "Restaurante",
                latitude: 27,
                longitude: -1,
                open: "12:00",
                close: "18:00"
            };

            jest.spyOn(interestPointsRepository, 'save').mockRejectedValueOnce(new Error());
            expect(interestPointsService.create(data)).rejects.toThrowError(HttpException);

        });
        it('should throw an exception latitude negative', () => {
            const data: InterestPointsCreateDto = {
              name: "Restaurante",
              latitude: -1,
              longitude: 12,
              open: "12:00",
              close: "18:00"
          };
      
            jest.spyOn(interestPointsRepository, 'save').mockRejectedValueOnce(new Error());
            expect(interestPointsService.create(data)).rejects.toThrowError(HttpException);
    
          });
    });

    describe('findAllAround', () => {
        it('should return a interest points around', async () => {
            const response = await interestPointsService.findAllAround(20,10,10,'19:00');

            expect(response).toEqual(MockInterestPointsFindAroundDto);
            expect(interestPointsRepository.find).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            jest.spyOn(interestPointsRepository, 'find').mockRejectedValueOnce(new Error());
            expect(interestPointsService.findAllAround(20,10,10,'19:00')).rejects.toThrowError();
        });
    });
});





