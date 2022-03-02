import { ResponseDto } from 'src/dto/response.dto'
import { InterestPointsFindAroundDto } from '../../dto/InterestPoints-around.find.dto'
import { InterestPoints } from '../../interestPoints.entity'


export const MockInterestPoints: InterestPoints[] = [
    new InterestPoints({
        id: 1,
        name: "Restaurante",
        latitude: 27,
        longitude: 12,
        open: "12:00",
        close: "18:00"
    }),
    new InterestPoints({
        id: 2,
        name: "Posto de combustível",
        latitude: 31,
        longitude: 18,
        open: "08:00",
        close: "18:00"
    }),
    new InterestPoints({
        id: 3,
        name: "Praça",
        latitude: 15,
        longitude: 12,
        open: "",
        close: ""
    }),
]

export const MockNewInterestPoint = new InterestPoints({
    name: 'Teste ponto interesse',
    latitude: 1,
    longitude: 2,
    open: '10:00',
    close: '20:00'
})


export const MockUpdateInterestPoint = new InterestPoints({
    name: 'Teste ponto interesse Update',
    latitude: 21,
    longitude: 22,
    open: '',
    close: ''
})



export const MockInterestPointsFindAroundDto: InterestPointsFindAroundDto[] = [
    new InterestPointsFindAroundDto({
        name: 'Restaurante',
        isOpen: 'FECHADO'
    }),
    new InterestPointsFindAroundDto({
        name: 'Praça',
        isOpen: 'ABERTO'
    })
];

export const mockResponseDelete: ResponseDto =
{
    message: "Ponto de interesse deletado com sucesso!",
    status: true
};

export const mockResponseCreate: ResponseDto =
{
    message: "Ponto de interesse cadastrado com sucesso!",
    status: true
};
