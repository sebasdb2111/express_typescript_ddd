export default class PasswordIsNotValidException extends Error
{
    constructor()
    {
        super(`The password in not valid`);
    }
}
