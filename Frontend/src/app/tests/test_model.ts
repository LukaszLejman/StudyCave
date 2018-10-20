export class Test {

    public add_date: string;
    public body: TestResource[];
    public edit_date?: string;
    public grade?: number;
    public id: number;
    public owner: number;
    public permission: string;
    public title: string;

    constructor() {}
}

export class TestResource {

    public type: string; // 'true-false', 'single-choice', 'multiple-choice', 'puzzle', 'gaps', 'pairs'
    public id: number;
    public points: number;
    public question: string;
    public nr: number;
    public answers: Answer[];

    constructor() {}
}

export class Answer {

    constructor(public id: number) {}
}

export class ChoiceAnswer extends Answer { // 'true-false', 'single-choice', 'multiple-choice'

    public content: string;
    public is_good: boolean;

    constructor(public id: number) {
        super(id);
    }
}

export class PuzzleAnswer extends Answer { // 'puzzle'

    public correct: string[];

    constructor(public id: number) {
        super(id);
    }
}

export class GapAnswer extends Answer { // 'gaps'

    public content: string;
    public is_gap: boolean;

    constructor(public id: number) {
        super(id);
    }
}

export class PairsAnswer extends Answer { // 'pairs'

    public first: string;
    public second: string;

    constructor(public id: number) {
        super(id);
    }
}
