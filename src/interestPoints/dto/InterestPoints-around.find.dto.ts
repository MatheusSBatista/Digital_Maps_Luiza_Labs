import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InterestPointsFindAroundDto {

    @ApiProperty({
        description: 'Nome do ponto de interesse',
        example: "Parque"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Ponto de interesse esta aberto?',
        example: "ABERTO"
    })
    @IsString()
    @IsNotEmpty()
    isOpen: string;


    constructor(interestPointsFindAroundDto?: Partial<InterestPointsFindAroundDto>) {
        this.name = interestPointsFindAroundDto?.name;
        this.isOpen = interestPointsFindAroundDto?.isOpen;
    }

}