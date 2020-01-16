export default class UserNotExistsException extends Error
{
    constructor(userId: number)
    {
        super(`User with id: ${userId} not exists`);
    }
}
