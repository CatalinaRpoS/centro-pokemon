export type Status = {
    name: string;
    image: string;
    priority: number;
};

export type Type = {
    name: string;
    image: string;
};

export type Pokemon = {
    id: number;
    turn: number;
    name: string;
    level: number;
    trainer_email?: string;
    trainer_fullname?: string;
    pokemon_status?: Status[];
    life_points: number;
    first_type: Type;
    second_type?: Type;
};
