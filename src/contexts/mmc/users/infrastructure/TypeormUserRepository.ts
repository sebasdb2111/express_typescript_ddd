import {getRepository} from 'typeorm';
import {User}          from '../domain/entity/User';
import UserRepository  from '../domain/UserRepository';

export default class TypeormUserRepository implements UserRepository
{
	async findOneOrFail(id: number): Promise<User>
	{
		const userRepository = getRepository(User);
		const user: User     = await userRepository.findOneOrFail(id);
		return Promise.resolve(user);
	}

	async findOneByUsername(username: string): Promise<User>
	{
		const userRepository = getRepository(User);
		const user: User     = await userRepository.findOneOrFail({where: {username}});
		return Promise.resolve(user);
	}

	async save(user: User): Promise<User>
	{
		const userRepository = getRepository(User);
		const saveUser: User = await userRepository.save(user);
		return Promise.resolve(saveUser);
	}

	async update(user: User): Promise<User>
	{
		const userRepository   = getRepository(User);
		const updateUser: User = await userRepository.save(user);
		return Promise.resolve(updateUser);
	}

	async updateIsActive(id: number, user: User): Promise<void>
	{
		const userRepository = getRepository(User);
		await userRepository.update(id, {isActive: user.isActive});
	}

	async updatePassword(id: number, user: User): Promise<void>
	{
		const userRepository = getRepository(User);
		await userRepository.update(id, {password: user.password});
	}

	async updateLastLogin(id: number, user: User): Promise<void>
	{
		const userRepository = getRepository(User);
		await userRepository.update(id, {lastLogin: user.lastLogin});
	}
}
