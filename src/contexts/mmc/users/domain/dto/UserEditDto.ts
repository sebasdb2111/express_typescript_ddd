export default class UserEditDto
{
    public id: number;
    public role: string;
    public email: string;
    public firstName: string;
    public lastName: string;

    constructor(
        id: number,
        role?: string,
        email?: string,
        firstName?: string,
        lastName?: string,
    )
    {
        this.id        = id;
        this.role      = role;
        this.email     = email;
        this.firstName = firstName;
        this.lastName  = lastName;
    }
}
