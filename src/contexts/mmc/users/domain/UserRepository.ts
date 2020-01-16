import {User} from './entity/User';

export default interface UserRepository
{
    findOneOrFail(id: number): Promise<User>;

    findOneByUsername(username: string): Promise<User>;

    save(user: User): Promise<User>;

    update(user: User): Promise<User>;

    updateIsActivate(id: number, user: User): Promise<void>;

    updatePassword(id: number, user: User): Promise<void>;
}
