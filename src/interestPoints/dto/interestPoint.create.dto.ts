import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString,IsPositive } from 'class-validator';

export class InterestPointsCreateDto {
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
    @IsNotEmpty()
    @IsPositive()
    latitude: number;

    @ApiProperty({
        description: 'Longitude (Y) do ponto de interesse',
        example: "23"
    })
    @IsNotEmpty()
    @IsPositive()
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