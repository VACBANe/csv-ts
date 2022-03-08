interface VacationDay {
    holidays: Array<Holiday>;
    vacations: Array<Vacation>;
    sickLeaves: Array<Vacation>;
}
interface Vacation {
    date?: string;
    startDate?: string;
    endDate?: string;
    personId: string;
}
interface Holiday {
    name: string;
    date: string;
}

export const FormatVacations = (arr: any) => {
    const resultArray: VacationDay = {
        vacations: [],
        holidays: [],
        sickLeaves: [],
    };
    for (const key in arr) {
        arr[key].forEach((day: any) => {
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
