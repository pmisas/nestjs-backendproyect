
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateProyectDto {
    
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    id_Admin:number

    @IsString()
    description:string



}
