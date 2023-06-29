import { PartialType } from '@nestjs/mapped-types'
import { CreateTaskDto } from './create-task.dto'
import { OmitType } from '@nestjs/swagger';

export class EditTaskDto extends PartialType(
    OmitType(CreateTaskDto, ['id_Proyect'] as const)
){}

