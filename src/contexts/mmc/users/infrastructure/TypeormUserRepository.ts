import {getRepository} from 'typeorm';
import {UserMySqlEntity}          from '../domain/entity/UserMySqlEntity';
import IUserMySqlRepository  from '../domain/IUserMySqlRepository';

export default class TypeormUserRepository implements IUserMySqlRepository
{
    async findOneOrFail(id: number): Promise<UserMySqlEntity>
    {
        const userRepository = getRepository(UserMySqlEntity);
        return await userRepository.findOneOrFail(id);
    }

    async findOneByUsername(username: string): Promise<UserMySqlEntity>
    {
        const userRepository = getRepository(UserMySqlEntity);
        return await userRepository.findOneOrFail({where: {username}});
    }

    async save(user: UserMySqlEntity): Promise<UserMySqlEntity>
    {
        const userRepository = getRepository(UserMySqlEntity);
        return await userRepository.save(user);
    }

    async update(user: UserMySqlEntity): Promise<UserMySqlEntity>
    {
        const userRepository = getRepository(UserMySqlEntity);
        return await userRepository.save(user);
    }

    async updateIsActivate(id: number, user: UserMySqlEntity): Promise<void>
    {
        const userRepository = getRepository(UserMySqlEntity);
        await userRepository.update(id, {isActive: user.isActive});
    }

    async updatePassword(id: number, user: UserMySqlEntity): Promise<void>
    {
        const userRepository = getRepository(UserMySqlEntity);
        await userRepository.update(id, {password: user.password});
    }
}
