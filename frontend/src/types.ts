export type Status = {
    name: string;
    image: string;
};

export type Pokemon = {
    id: number;
    turn: number;
    name: string;
    level: number;
    trainer_fullname: string;
    life_points: number;
    first_type: string;
    second_type: string;
};