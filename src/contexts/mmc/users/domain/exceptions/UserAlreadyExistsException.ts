export default class UserAlreadyExistsException extends Error
{
    constructor(userId: string)
    {
        super(`User ${userId} already exists`);
    }
}
