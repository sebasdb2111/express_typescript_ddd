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
}
