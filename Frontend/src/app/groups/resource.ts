export class Resource {

    add_date?: string;
    edit_date?: string;
    grade?: number;
    id?: number;
    owner?: string;
    ownerId?: number;
    permission?: string;
    title?: string;
    comment?: string = '';
    points?: number = 0;

    constructor() {}
}

export enum ResourceStatus {
    accepted = 'ACCEPTED',
    rejected = 'REJECTED'
}
