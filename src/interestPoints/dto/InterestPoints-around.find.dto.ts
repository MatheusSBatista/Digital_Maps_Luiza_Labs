import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString } from 'class-validator';

export class InterestPointsFindAroundDto {


    @IsNotEmpty()
    latitude: number;


    @IsNotEmpty()
    longitude: number;


    @IsString()
    meters: string;
}