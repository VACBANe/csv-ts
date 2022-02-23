export interface IPerson {
    name: string;
    id: string;
    contracts: IContract[];
    totalHours: number[];
    totalMoney: number;
    avatar: string;
}
export interface IContract {
    name: string;
    id: string;
    dates: IDay[];
    totalHours: number[];
    totalMoney: number;
}
export interface IDay {
    date: number;
    hours: number[];
    money: string;
}