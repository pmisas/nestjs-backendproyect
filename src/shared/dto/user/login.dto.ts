import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    
    @IsString()
    @IsNotEmpty()
    email:string

    @IsNotEmpty({message: 'La contraseña no puede estar vacia'})
    @MinLength(5, {message: 'longitud minima de 5'})
    @MaxLength(10, {message: 'longitud maxima de 10'})
    @IsString()
    password: string;
}
