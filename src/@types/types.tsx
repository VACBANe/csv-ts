export type dataType = Array<[number, string, string, number[], string]>;
export interface IPerson {
    adminId: string;
    name: string;
    id: string;
    contracts: IContract[];
    totalHours: number[];
    totalMoney: number;
    avatar: string| undefined;
}
export interface IContract {
    name: string;
    id: string;
    dates: IDay[];
    totalHours: number[];
    totalMoney: number| string;
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
    holidays: Holiday[];
    sickLeaves: OneDayOff[] | FewDaysOff[];
    vacations: OneDayOff[] | FewDaysOff[];
}

export interface Holiday {
    name: string;
    date: string;
}
export interface DayOff {
    personId: string;
}
export interface OneDayOff extends DayOff {
    date: string;
}
export interface FewDaysOff extends DayOff {
    startDate: string;
    endDate: string;
}
