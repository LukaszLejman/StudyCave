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
