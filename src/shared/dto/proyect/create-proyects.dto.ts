
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateProyectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    id_Admin:number

    @IsString()
    description:string



}
