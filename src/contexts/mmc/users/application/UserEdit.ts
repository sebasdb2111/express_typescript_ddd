import {User}                           from '../domain/entity/User';
import UserRepository                   from '../domain/UserRepository';
import UserCreateDto                    from '../domain/dto/UserCreateDto';
import UserEditDto                      from "../domain/dto/UserEditDto";
import {isNullOrUndefined, isUndefined} from "util";
import UserNotExistGuard                from "../../shared/application/UserNotExistGuard";

export default class UserCreate
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(userEditDto: UserEditDto): Promise<User>
    {
        const user: User = await this.repository.findOneOrFail(userEditDto.id);

        await new UserNotExistGuard(userEditDto.id, user);

        user.email     = userEditDto.email ? userEditDto.email : user.email;
        user.role      = userEditDto.role ? userEditDto.role : user.role;
        user.firstName = userEditDto.firstName ? userEditDto.firstName : user.firstName;
        user.lastName  = userEditDto.lastName ? userEditDto.lastName : user.lastName;

        return this.repository.update(user);
    }
}