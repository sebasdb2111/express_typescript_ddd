import {UserMySqlEntity}            from '../domain/entity/UserMySqlEntity';
import IUserMySqlRepository    from '../domain/IUserMySqlRepository';
import UserNotExistGuard from "../../shared/application/UserNotExistGuard";

export default class UserCreate
{
    private repository: IUserMySqlRepository;

    constructor(repository: IUserMySqlRepository)
    {
        this.repository = repository;
    }

    async run(userId: number): Promise<UserMySqlEntity>
    {
        const user: UserMySqlEntity = await this.repository.findOneOrFail(userId);

        await new UserNotExistGuard(userId, user);

        return user;
    }
}
