import {User}         from '../domain/entity/User';
import UserRepository from '../domain/UserRepository';
import UserCreateDto  from '../domain/dto/UserCreateDto';

export default class UserCreate
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(userDto: UserCreateDto): Promise<User>
    {
        const user: User = new User();
        user.username    = userDto.username;
        user.password    = userDto.password;
        user.role        = userDto.role;
        user.email       = userDto.email;
        user.firstName   = userDto.firstName;
        user.lastName    = userDto.lastName;
        user.isActive    = userDto.isActive;

        user.hashPassword();

        return this.repository.save(user);
    }
}
