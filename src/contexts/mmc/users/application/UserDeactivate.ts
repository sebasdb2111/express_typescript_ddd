import {UserMySqlEntity}            from '../domain/entity/UserMySqlEntity';
import IUserMySqlRepository    from '../domain/IUserMySqlRepository';
import UserDeactivateDto from '../domain/dto/UserDeactivateDto';
import UserNotExistGuard from '../../shared/application/UserNotExistGuard';

export default class UserCreate
{
    private repository: IUserMySqlRepository;

    constructor(repository: IUserMySqlRepository)
    {
        this.repository = repository;
    }

    async run(userDeactivateDto: UserDeactivateDto): Promise<void>
    {
        const user: UserMySqlEntity = await this.repository.findOneOrFail(userDeactivateDto.id);
        user.isActive    = userDeactivateDto.isActive;

        await new UserNotExistGuard(userDeactivateDto.id, user);

        return this.repository.updateIsActivate(userDeactivateDto.id, user);
    }
}
