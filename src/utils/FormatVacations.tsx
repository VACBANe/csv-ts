import {IVacations} from "../@types/types";

interface Props {
    userId?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    name?: string
}

export const FormatVacations = (arr: IVacations) => {
    const resultArray: IVacations = {
        vacations: [],
        holidays: [],
        sickLeaves: [],
    };
    for (const key in arr) {
        // @ts-ignore
        arr[key].forEach((day: Props) => {
            if (key === 'holidays' && day.date && day.name) {
                const date = day.date.split('/').reverse().join('.');
                resultArray[key].push({
                    name: day.name,
                    date: date,
                });
            } else {
                if (day.startDate) {
                    // @ts-ignore
                    resultArray[key].push({
                        personId: day.userId,
                        startDate: day.startDate,
                        endDate: day.endDate,
                    });
                }
                if (day.date) {
                    // @ts-ignore
                    resultArray[key].push({
                        personId: day.userId,
                        date: day.date,
                    });
                }
            }
        });
    }
    return resultArray;
};
