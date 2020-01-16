import {getRepository} from 'typeorm';
import {User}          from '../domain/entity/User';
import UserRepository  from '../domain/UserRepository';

export default class TypeormUserRepository implements UserRepository
{
    async findOneOrFail(id: number): Promise<User>
    {
        const userRepository = getRepository(User);
        return await userRepository.findOneOrFail(id);
    }

    async findOneByUsername(username: string): Promise<User>
    {
        const userRepository = getRepository(User);
        return await userRepository.findOneOrFail({where: {username}});
    }

    async save(user: User): Promise<User>
    {
        const userRepository = getRepository(User);
        return await userRepository.save(user);
    }

    async update(user: User): Promise<User>
    {
        const userRepository = getRepository(User);
        return await userRepository.save(user);
    }

    async updateIsActivate(id: number, user: User): Promise<void>
    {
        const userRepository = getRepository(User);
        await userRepository.update(id, {isActive: user.isActive});
    }

    async updatePassword(id: number, user: User): Promise<void>
    {
        const userRepository = getRepository(User);
        await userRepository.update(id, {password: user.password});
    }
}
