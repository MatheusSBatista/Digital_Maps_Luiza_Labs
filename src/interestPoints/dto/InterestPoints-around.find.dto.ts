import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString, isPositive, IsPositive } from 'class-validator';

export class InterestPointsFindAroundDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    isOpen: string;

}