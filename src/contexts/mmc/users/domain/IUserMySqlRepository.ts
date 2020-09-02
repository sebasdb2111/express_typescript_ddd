import {UserMySqlEntity} from './entity/UserMySqlEntity';

export default interface IUserMySqlRepository
{
    findOneOrFail(id: number): Promise<UserMySqlEntity>;

    findOneByUsername(username: string): Promise<UserMySqlEntity>;

    save(user: UserMySqlEntity): Promise<UserMySqlEntity>;

    update(user: UserMySqlEntity): Promise<UserMySqlEntity>;

    updateIsActivate(id: number, user: UserMySqlEntity): Promise<void>;

    updatePassword(id: number, user: UserMySqlEntity): Promise<void>;
}
