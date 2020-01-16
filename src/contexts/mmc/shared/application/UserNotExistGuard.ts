import UserNotExistException from '../../shared/domain/exceptions/UserNotExistsException';
import {User}                from '../../users/domain/entity/User';

export default class UserNotExistGuard
{
    private userId: number;
    private user: User;

    constructor(userId: number, user: User)
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
