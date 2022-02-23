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
import { IContract, IPerson } from './@types/types';
import sumTimes from './utils/sumTimes';

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState<any[]>([]);
    const [personsAndContracts, setPersonsAndContracts] = useState<any[]>([]);
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

    //берем файл в драгндропа
    useEffect(() => {
        if (selectedFile) {
            Papa.parse(selectedFile, {
                complete: function (results) {
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
        let personsObjects: any[] = [];
        //создаем обьекты юзеров
        uniquePersons.forEach((person) => {
            personsObjects.push({
                id: person.match(/\(\w+\)/)![0].replace(/[()]/g, ''),
                name: person.replace(/\(\w+\)/, ' ').trim(),
                contracts: [],
                totalMoney: 0,
                totalHours: [0, 0],
                avatar: 'https://pm1.narvii.com/6785/fb370186e45f0d4c31605c1f16e3ed61104c8c0bv2_hq.jpg',
            });
        });
        data &&
            data.forEach((item) => {
                personsObjects.forEach((person) => {
                    if (
                        person.name === item[1].replace(/\(\w+\)/, ' ').trim()
                    ) {
                        let element = person.contracts.find(
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

    const calculateSum = (personsNContracts: IPerson[]) => {
        let tempWeekHours = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        let tempWeekMoney = [0, 0, 0, 0, 0, 0, 0];
        personsNContracts.forEach((item) => {
            item.contracts.forEach((contract) => {
                daysInWeek.forEach((day) => {
                    let element;
                    element = contract.dates.find((item) => item.date === day);
                    if (element) {
                        let sumMoney = tempWeekMoney[day - 1];
                        let sumHours = tempWeekHours[day - 1];
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
                        <Header />
                        {personsAndContracts.map((item) => {
                            return item.contracts.map(
                                (contract: IContract, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <Person index={index} item={item} />
                                            <ContractBlock>
                                                <div>{contract.name}</div>
                                            </ContractBlock>
                                            {daysInWeek.map((day, index) =>
                                                DatesFunc(contract, day, index)
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
                        <TotalRow weekHours={weekHours} weekMoney={weekMoney} />
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
