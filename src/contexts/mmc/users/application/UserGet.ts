import {User}            from '../domain/entity/User';
import UserRepository    from '../domain/UserRepository';
import UserNotExistGuard from "../../shared/application/UserNotExistGuard";

export default class UserCreate
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(userId: number): Promise<User>
    {
        const user: User = await this.repository.findOneOrFail(userId);

        await new UserNotExistGuard(userId, user);

        return user;
    }
}
