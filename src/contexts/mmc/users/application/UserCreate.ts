import {User}         from '../domain/entity/User';
import UserRepository from '../domain/UserRepository';
import UserDto        from '../domain/UserDto';

export default class UserCreate
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(userDto: UserDto): Promise<User>
    {
        const user: User = new User();
        user.username    = userDto.username;
        user.password    = userDto.password;
        user.role        = userDto.role;

        user.hashPassword();

        return this.repository.save(user);
    }
}
