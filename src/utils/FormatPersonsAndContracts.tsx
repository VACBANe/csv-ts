import { dataType, IDataBase, IPerson } from '../@types/types';
import sumTimes from './sumTimes';
import { SetStateAction } from 'react';

export const FormatPersonsAndContracts = (
    data: dataType,
    setPersonsAndContracts: React.Dispatch<SetStateAction<IPerson[]>>,
    database: IDataBase
) => {
    const findObj = (id: string) =>
        database[id]?.avatar ? database[id].avatar : undefined;
    const findId = (id: string) =>
        database[id]?.adminId ? database[id].adminId : '0';
    let uniquePersons: string[] = [];
    data.forEach((item) => {
        uniquePersons.push(item[1]);
    });
    uniquePersons = [...new Set(uniquePersons)];
    const personsObjects: IPerson[] = [];
    uniquePersons.forEach((person) => {
        // @ts-ignore
        const personId = person.match(/\(\w+\)/)[0].replace(/[()]/g, '');
        personsObjects.push({
            id: personId,
            name: person.replace(/\(\w+\)/, ' ').trim(),
            contracts: [],
            totalMoney: 0,
            totalHours: [0, 0],
            avatar: findObj(personId),
            adminId: findId(personId),
        });
    });
    data.forEach((item) => {
        personsObjects.forEach((person) => {
            if (person.name === item[1].replace(/\(\w+\)/, ' ').trim()) {
                const element = person.contracts.find(
                    (i) => i.name === item[2].replace(/\(\w+\)/, ' ').trim()
                );
                if (element) {
                    element.dates.push({
                        date: item[0],
                        hours: item[3],
                        money: item[4],
                    });
                    element.totalMoney = +(
                        +element.totalMoney + +item[4]
                    ).toFixed(2);
                    person.totalMoney = +(
                        +person.totalMoney + +item[4]
                    ).toFixed(2);
                    element.totalHours = sumTimes(element.totalHours, item[3]);
                    person.totalHours = sumTimes(person.totalHours, item[3]);
                } else {
                    person.contracts.push({
                        name: item[2].replace(/\(\w+\)/, ' ').trim(),
                        // @ts-ignore
                        id: item[2].match(/\(\w+\)/)[0].replace(/[()]/g, ''),
                        dates: [
                            {
                                date: item[0],
                                hours: item[3],
                                money: item[4],
                            },
                        ],
                        totalMoney: item[4] ? item[4] : 0,
                        totalHours: item[3] ? item[3] : [0, 0],
                    });
                    person.totalMoney = +(
                        +person.totalMoney + +item[4]
                    ).toFixed(2);
                    person.totalHours = sumTimes(person.totalHours, item[3]);
                }
            }
        });
    });
    setPersonsAndContracts(personsObjects);
    return personsObjects
};
