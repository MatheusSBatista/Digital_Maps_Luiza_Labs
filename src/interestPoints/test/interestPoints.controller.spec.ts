import { Test } from '@nestjs/testing';
import { InterestPoints } from '../interestPoints.entity';
import { InterestPointsController } from '../interestPoints.controller';
import { InterestPointsService } from '../interestPoints.service';
import { InterestPointsCreateDto } from '../dto/interestPoint.create.dto';
import { MockInterestPoints, MockInterestPointsFindAroundDto, MockNewInterestPoint, MockUpdateInterestPoint } from './mocks/interestPoints.mock'


describe('InterestPointsController', () => {

    let interestPointsController: InterestPointsController;
    let interestPointsService: InterestPointsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [InterestPointsController],
            providers: [{
                provide: InterestPointsService,
                useValue: {
                    findAll: jest.fn().mockResolvedValue(MockInterestPoints),
                    create: jest.fn().mockResolvedValue(MockNewInterestPoint),
                    findAllAround: jest.fn().mockResolvedValue(MockInterestPointsFindAroundDto),
                    update: jest.fn().mockResolvedValue(MockUpdateInterestPoint),
                    delete: jest.fn().mockResolvedValue(undefined)
                }
            }],
        }).compile();

        interestPointsService = moduleRef.get<InterestPointsService>(InterestPointsService);
        interestPointsController = moduleRef.get<InterestPointsController>(InterestPointsController);
    });

    describe('Controller defined', () => {
        it('should be defined', () => {
            expect(interestPointsController).toBeDefined();
            expect(interestPointsService).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should return a interestPoints list', async () => {
            const response = await interestPointsController.findAll();
            expect(response).toEqual(MockInterestPoints);
            expect(typeof response).toEqual('object');
            expect(interestPointsService.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            jest.spyOn(interestPointsService, 'findAll').mockRejectedValueOnce(new Error());
            expect(interestPointsController.findAll()).rejects.toThrowError();
        });
    });

    describe('create', () => {
        it('should create a new interestPoint', async () => {
            const body: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            };

            const response = await interestPointsController.create(body);

            expect(response).toEqual(MockNewInterestPoint);
            expect(interestPointsService.create).toHaveBeenCalledTimes(1);
            expect(interestPointsService.create).toHaveBeenCalledWith(body);

        });

        it('should throw an exception', async () => {
            const body: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            };

            jest.spyOn(interestPointsService, 'create').mockRejectedValueOnce(new Error());
            expect(interestPointsController.create(body)).rejects.toThrowError();
        });

    });

    describe('update', () => {
        it('should update a interestPoint', async () => {
            const body: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            };

            const response = await interestPointsController.update(1, body);

            expect(response).toEqual(MockUpdateInterestPoint);
            expect(interestPointsService.update).toHaveBeenCalledTimes(1)
            expect(interestPointsService.update).toHaveBeenCalledWith(1, body)

        });

        it('should throw an exception', async () => {
            const body: InterestPointsCreateDto = {
                name: 'Teste ponto interesse',
                latitude: 1,
                longitude: 2,
                open: '10:00',
                close: '20:00'
            }

            jest.spyOn(interestPointsService, 'update').mockRejectedValueOnce(new Error())
            expect(interestPointsController.update(1, body)).rejects.toThrowError();
        });
    });

    describe('delete', () => {
        it('should delete interestPoint', async () => {

            const response = await interestPointsController.delete(1);

            expect(response).toBeUndefined();
            expect(interestPointsService.delete).toHaveBeenCalledTimes(1);

        });

        it('should throw an exception', async () => {
            jest.spyOn(interestPointsService, 'create').mockRejectedValueOnce(new Error());
            expect(interestPointsController.delete(1)).rejects.toThrowError();
        });

    });


    describe('findAllAround', () => {
        it('should find interestPoint arround', async () => {
            const response = await interestPointsController.findAllAround(20, 10, 10, '19:00');

            expect(response).toEqual(MockInterestPointsFindAroundDto);
            expect(interestPointsService.findAllAround).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            jest.spyOn(interestPointsService, 'findAllAround').mockRejectedValueOnce(new Error());
            expect(interestPointsController.findAllAround(20, 10, 10, '19:00')).rejects.toThrowError();
        });

    });

});