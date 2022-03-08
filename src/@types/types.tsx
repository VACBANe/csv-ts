export interface IPerson {
    adminId: string;
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
export interface IDataBase {
    [key: string]: {
        adminId: string;
        avatar: string;
        name: string;
    }
}
export interface IVacations {
    holidays: object[];
    sickLeaves: object[];
    vacations: object[];
}