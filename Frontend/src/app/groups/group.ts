export class Group {
    public id?: number;
    public name?: string;
    public description?: string;
    public groupKey?: string; // kod dostępu
    public role?: string; // MEMBER || OWNER
    public owner?: string; // nazwa użytkownika z rolą OWNER
    public users?: UsersConfig[];

    constructor() {}
}

export interface UsersConfig {
    id: number;
    username: string;
}

export class ActivityHistory {

    public date: Date;
    public from: string;
    public to: string;
    public type: string;
    public points: number;
    public comment: string;
    public typeOfResource: string;
    public nameOfResource: string;

    constructor() {}
}
