import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString, isPositive, IsPositive } from 'class-validator';

export class InterestPointsFindAroundDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    meters: number;

    @IsString()
    @IsNotEmpty()
    isOpen: string;

}