export class User 
{
    _id: number;
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    admin: boolean;
    status: UserStatus;

    SetStatus(status)
    {
        this.status = <UserStatus> status;
    }
}

export enum UserStatus 
{
    OFFLINE,
    ONLINE,
    AWAY
}
