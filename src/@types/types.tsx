export interface IPerson {
    name: string;
    id: string;
    contracts: Contract[];
    totalHours: number;
    totalMoney: number;
    avatar: string;
}
export interface Contract {
    name: string;
    id: string;
    dates: Day[];
    totalHours: number;
    totalMoney: number;
}
export interface Day {
    date: number;
    hours: string;
    money: string;
}