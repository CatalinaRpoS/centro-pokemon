export type Status = {
    name: string;
    image: string;
};

export type Pokemon = {
    turn: number;
    name: string;
    level: number;
    trainer: string;
    lifePoints: number;
    status: Array<Status>;
    type: Array<string>;
    image: string;
};