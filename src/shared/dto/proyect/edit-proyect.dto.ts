import { OmitType} from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types"
import { CreateProyectDto } from "./create-proyects.dto";

export class EditProyectDto extends PartialType(
    OmitType(CreateProyectDto, ['id_Admin'] as const)
){}
