import {UserMySqlEntity}                           from '../domain/entity/UserMySqlEntity';
import IUserMySqlRepository                   from '../domain/IUserMySqlRepository';
import UserCreateDto                    from '../domain/dto/UserCreateDto';
import UserEditDto                      from "../domain/dto/UserEditDto";
import {isNullOrUndefined, isUndefined} from "util";
import UserNotExistGuard                from "../../shared/application/UserNotExistGuard";

export default class UserCreate
{
    private repository: IUserMySqlRepository;

    constructor(repository: IUserMySqlRepository)
    {
        this.repository = repository;
    }

    async run(userEditDto: UserEditDto): Promise<UserMySqlEntity>
    {
        const user: UserMySqlEntity = await this.repository.findOneOrFail(userEditDto.id);

        await new UserNotExistGuard(userEditDto.id, user);

        user.email     = userEditDto.email ? userEditDto.email : user.email;
        user.role      = userEditDto.role ? userEditDto.role : user.role;
        user.firstName = userEditDto.firstName ? userEditDto.firstName : user.firstName;
        user.lastName  = userEditDto.lastName ? userEditDto.lastName : user.lastName;

        return this.repository.update(user);
    }
}