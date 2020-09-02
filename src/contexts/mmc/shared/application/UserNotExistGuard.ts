import UserNotExistException from '../../shared/domain/exceptions/UserNotExistsException';
import {UserMySqlEntity}                from '../../users/domain/entity/UserMySqlEntity';

export default class UserNotExistGuard
{
    private userId: number;
    private user: UserMySqlEntity;

    constructor(userId: number, user: UserMySqlEntity)
    {
        this.userId = userId;
        this.user   = user;
    }

    async run()
    {
        if (!this.user) {
            throw new UserNotExistException(this.userId);
        }
    }
}
