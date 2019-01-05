export enum RankingType {
    all = 'all',
    test = 'test'
}

export interface Data {
    type: string;
    data: Array<Array<any>>;
}
