import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInterestPointsDto {

    @ApiProperty({
        description: 'Nome do ponto de interesse',
        example: "Parque"
    })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({
        description: 'Latitude (X) do ponto de interesse',
        example: "10"
    })
    latitude: number;

    @ApiProperty({
        description: 'Longitude (Y) do ponto de interesse',
        example: "23"
    })
    longitude: number;

    @ApiProperty({
        description: 'Horario de abertura do ponto de interesse',
        example: '10:00'
    })
    @IsString()
    open?: string;
    @ApiProperty({
        description: 'Horario de fachamento do ponto de interesse',
        example: '18:00'
    })
    @IsString()
    close?: string;
}