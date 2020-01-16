export default class UserDeactivateDtoAinhoa
{
    public id: number;
    public isActive: boolean;

    constructor(
        id: number,
        isActive: boolean,
    )
    {
        this.id       = id;
        this.isActive = isActive;
    }
}
