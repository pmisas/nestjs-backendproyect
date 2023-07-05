import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, isEmpty } from "class-validator";

export class CreateUserDto {
    

    @IsString()
    name:string

    @IsNotEmpty({message: 'El nombre de usuario no puede estar vacio'})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: 'La contraseña no puede estar vacia'})
    @MinLength(5, {message: 'longitud minima de 5'})
    @MaxLength(10, {message: 'longitud maxima de 10'})
    @IsString()
    password: string;

    @IsBoolean()
    is_Admin: boolean

    @IsString()
    avatar: string

    @IsOptional()
    @IsNumber()
    id_Proyect: number

    @IsEmpty()
    @IsNumber()
    age:number

    @IsEmpty()
    @IsString()
    description:string

    @IsEmpty()
    @IsString()
    gender?:string

    @IsEmpty()
    @IsString()
    info?:string

    @IsEmpty()
    @IsString()
    charge?:string


}

