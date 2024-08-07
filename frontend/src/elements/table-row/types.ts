export interface Turn {
    turno: number;
    name: string;
    level: number;
    pv: number;
    status: string;
    trainer: string;
}

export interface IDragResult {
    source: { index: number };
    destination: { index: number } | null;
}
