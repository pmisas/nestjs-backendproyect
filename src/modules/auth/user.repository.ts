import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class AuthRepository extends Repository<User>{}
