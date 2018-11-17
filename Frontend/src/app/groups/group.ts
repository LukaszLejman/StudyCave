export class Group {
    public id?: number;
    public name?: string;
    public description?: string;
    public key?: string; // kod dostępu
    public role?: string; // MEMBER || OWNER
    public owner?: string; // nazwa użytkownika z rolą OWNER

    constructor() {}
}
