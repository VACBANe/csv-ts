import styled from 'styled-components';
import { SetStateAction, useEffect, useState } from 'react';
import Papa from 'papaparse';

import './App.css';
import DragAndDrop from './DragAndDrop';
import changeDateAndTimeFormat from './utils/ChangeDateAndTimeFormat';
import Header from './components/Header';
import { ContractBlock } from './components/ContractBlock';
import HoursAndDollars from './components/HoursAndDollars';
import TotalRow from './components/TotalRow';
import Person from './components/Person';
import DatesFunc from './components/DatesFunc';
import {IContract, IDataBase, IPerson, IVacations} from './@types/types';
import sumTimes from './utils/sumTimes';
// @ts-ignore
import blob from './hello.csv';
import { GetDateInterval } from './utils/GetDateInterval';
import { FormatVacations } from './utils/FormatVacations';

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState<any[]>([]);
    const [personsAndContracts, setPersonsAndContracts] = useState<Array<IPerson>>([]);
    const [database, setDataBase] = useState<IDataBase>({});
    const [vacations, setVacations] = useState<IVacations>();
    const [weekMoney, setWeekMoney] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [weekHours, setWeekHours] = useState([
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]);
    const daysInWeek = [1, 2, 3, 4, 5, 6, 7];
    const findObj = (id: string) => {
        if (database[id]?.avatar) {
            return database[id].avatar;
        } else return null;
    };
    const findId = (id: string) => {
        if (database[id]?.adminId) {
            return database[id].adminId;
        } else return '0';
    };
    useEffect(() => {
        Papa.parse(blob, {
            download: true,
            complete: function (input) {
                const records = input.data;
                const tempdatabase: any = {};
                records.forEach((person: any) => {
                    tempdatabase[person[0]] = {
                        name: person[2],
                        avatar: person[3],
                        adminId: person[1],
                    };
                });
                setDataBase(tempdatabase);
            },
        });
    }, []);
    //берем файл в драгндропа
    useEffect(() => {
        if (selectedFile) {
            Papa.parse(selectedFile, {
                complete: async function (results) {
                    setVacations(
                        FormatVacations({
                            vacations: [
                                {
                                    _id: '61e957e46c2ff30012eb6db7',
                                    userId: '6113c82119e5740011288e41',
                                    status: 'approved',
                                    startDate: '2022-01-20',
                                    endDate: '2022-01-21',
                                    comment: 'нужно в больницу пойти',
                                    deleted: false,
                                },
                            ],
                            holidays: [
                                {
                                    name: 'InternationalWomanDay',
                                    date: '19/01/2022',
                                },
                            ],
                            sickLeaves: [
                                {
                                    _id: '61ea78656c2ff30012eb7667',
                                    userId: '5f57b9c9b642eb0017808883',
                                    date: '2022-01-21',
                                    comment: 'Пфайзер догнал меня ',
                                    deleted: false,
                                    isViewed: true,
                                },
                            ],
                        })
                    );
                    await GetDateInterval(results.data).then((res) => {
                        res && setVacations(FormatVacations(res));
                    });
                    setData(changeDateAndTimeFormat(results.data));
                },
            });
        }
    }, [selectedFile]);
    useEffect(() => {
        let uniquePersons: string[] = [];
        data &&
            data.forEach((item) => {
                uniquePersons.push(item[1]);
            });
        uniquePersons = [...new Set(uniquePersons)];
        const personsObjects: any[] = [];
        //создаем обьекты юзеров
        uniquePersons.forEach((person) => {
            const personId = person.match(/\(\w+\)/)![0].replace(/[()]/g, '');
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
        data &&
            data.forEach((item) => {
                personsObjects.forEach((person) => {
                    if (
                        person.name === item[1].replace(/\(\w+\)/, ' ').trim()
                    ) {
                        const element = person.contracts.find(
                            (i: IPerson) =>
                                i.name ===
                                item[2].replace(/\(\w+\)/, ' ').trim()
                        );
                        if (element) {
                            element.dates.push({
                                date: item[0],
                                hours: item[3],
                                money: item[4],
                            });
                            element.totalMoney = (
                                +element.totalMoney + +item[4]
                            ).toFixed(2);
                            person.totalMoney = (
                                +person.totalMoney + +item[4]
                            ).toFixed(2);
                            element.totalHours = sumTimes(
                                element.totalHours,
                                item[3]
                            );
                            person.totalHours = sumTimes(
                                person.totalHours,
                                item[3]
                            );
                        } else {
                            person.contracts.push({
                                name: item[2].replace(/\(\w+\)/, ' ').trim(),
                                id: item[2]
                                    .match(/\(\w+\)/)[0]
                                    .replace(/[()]/g, ''),
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
                            person.totalMoney = (
                                +person.totalMoney + +item[4]
                            ).toFixed(2);
                            person.totalHours = sumTimes(
                                person.totalHours,
                                item[3]
                            );
                        }
                    }
                });
            });
        calculateSum(personsObjects);
        setPersonsAndContracts(personsObjects);
    }, [data]);
    console.log(vacations)
    const calculateSum = (personsNContracts: IPerson[]) => {
        const tempWeekHours = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        const tempWeekMoney = [0, 0, 0, 0, 0, 0, 0];
        personsNContracts.forEach((item) => {
            item.contracts.forEach((contract) => {
                daysInWeek.forEach((day) => {
                    const element = contract.dates.find((item) => item.date === day);
                    if (element) {
                        const sumMoney = tempWeekMoney[day - 1];
                        const sumHours = tempWeekHours[day - 1];
                        tempWeekMoney[day - 1] = +(
                            +sumMoney + Number(element.money)
                        ).toFixed(2);
                        tempWeekHours[day - 1] = sumTimes(
                            sumHours,
                            element.hours
                        );
                    }
                });
            });
        });
        setWeekMoney(tempWeekMoney);
        setWeekHours(tempWeekHours);
    };
    return (
        <div className="App">
            <DragAndDrop
                /*@ts-ignore*/
                handleDrop={(files: SetStateAction<undefined>[]) =>
                    setSelectedFile(files[0])
                }
            />
            {selectedFile && (
                <TableWrapper>
                    <tbody>
                        {vacations && <Header vacations={vacations} />}
                        {personsAndContracts.map((item) => {
                            return item.contracts.map(
                                (contract: IContract, index: number) => {
                                    const contractNum = index;
                                    return (
                                        <tr key={index}>
                                            <Person index={index} item={item} />
                                            <ContractBlock>
                                                <div>{contract.name}</div>
                                            </ContractBlock>
                                            {daysInWeek.map((day, index) =>
                                                DatesFunc(
                                                    contract,
                                                    day,
                                                    item.adminId,
                                                    vacations,
                                                    index,
                                                    contractNum
                                                )
                                            )}
                                            <td
                                                colSpan={
                                                    item.contracts.length === 1
                                                        ? 2
                                                        : 1
                                                }
                                            >
                                                <HoursAndDollars
                                                    time={contract.totalHours}
                                                    money={contract.totalMoney}
                                                />
                                            </td>
                                            {item.contracts.length ===
                                            1 ? null : index === 0 ? (
                                                <td
                                                    rowSpan={
                                                        item.contracts.length
                                                    }
                                                >
                                                    <HoursAndDollars
                                                        time={item.totalHours}
                                                        money={item.totalMoney}
                                                    />
                                                </td>
                                            ) : null}
                                        </tr>
                                    );
                                }
                            );
                        })}
                        <TotalRow weekHours={weekHours} weekMoney={weekMoney} vacations={vacations}/>
                    </tbody>
                </TableWrapper>
            )}
        </div>
    );
}

const TableWrapper = styled.table`
    width: 1024px;
    margin: 0 auto;
`;
export default App;
