import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "../user/create-user.dto";
import { Proyect } from "src/entities/proyect.entity";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    id_Proyect:number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsNotEmpty()
    @IsBoolean()
    chek: boolean;

    @IsOptional()
    @IsArray()
    users:[]

}
