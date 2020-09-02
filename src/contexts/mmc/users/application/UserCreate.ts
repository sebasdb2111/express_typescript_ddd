import {UserMySqlEntity}         from '../domain/entity/UserMySqlEntity';
import IUserMySqlRepository from '../domain/IUserMySqlRepository';
import UserCreateDto  from '../domain/dto/UserCreateDto';

export default class UserCreate
{
    private repository: IUserMySqlRepository;

    constructor(repository: IUserMySqlRepository)
    {
        this.repository = repository;
    }

    async run(userDto: UserCreateDto): Promise<UserMySqlEntity>
    {
        const user: UserMySqlEntity = new UserMySqlEntity();
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
