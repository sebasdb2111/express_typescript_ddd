export default class PasswordIsNotValidException extends Error
{
    constructor(username: string)
    {
        super(`The password in not valid for the username: ${username}`);
    }
}
