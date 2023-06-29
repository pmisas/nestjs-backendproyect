import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class AvatarDto {

    @IsNotEmpty()
    @IsString()
    url: string;

}