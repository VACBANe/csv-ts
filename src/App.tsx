import './App.css';
import { SetStateAction, useEffect, useState } from 'react';
import Papa from 'papaparse';
import DragAndDrop from './DragAndDrop';
import changeDateFormat from './utils/ChangeDateFormat';
import styled from 'styled-components';

interface Person {
    name: string;
    id: string;
    contracts: Contract[];
    total: number;
}
interface Contract {
    name: string;
    id: string;
    dates: Day[];
    total: number;
}
interface Day {
    date: number;
    hours: string;
    money: string;
}
function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState<any[]>([]);
    const [personsAndContracts, setPersonsAndContracts] = useState<any[]>([]);
    const [week, setWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
    const daysInWeek = [1, 2, 3, 4, 5, 6, 7];
    useEffect(() => {
        if (selectedFile) {
            Papa.parse(selectedFile, {
                complete: function (results) {
                    setData(changeDateFormat(results.data));
                    setData(results.data);
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
        uniquePersons.forEach((person) => {
            personsObjects.push({
                id: person.match(/\(\w+\)/)![0].replace(/[()]/g, ''),
                name: person.replace(/\(\w+\)/, ' ').trim(),
                contracts: [],
                total: 0,
            });
        });
        data &&
            data.forEach((item) => {
                personsObjects.forEach((person) => {
                    if (
                        person.name === item[1].replace(/\(\w+\)/, ' ').trim()
                    ) {
                        let element = person.contracts.find(
                            (i: Person) =>
                                i.name ===
                                item[2].replace(/\(\w+\)/, ' ').trim()
                        );
                        if (element) {
                            element.dates.push({
                                date: new Date(item[0]).getDay(),
                                hours: item[3],
                                money: item[4],
                            });
                            element.total = (+element.total + +item[4]).toFixed(
                                2
                            );
                        } else {
                            person.contracts.push({
                                name: item[2].replace(/\(\w+\)/, ' ').trim(),
                                id: item[2]
                                    .match(/\(\w+\)/)[0]
                                    .replace(/[()]/g, ''),
                                dates: [
                                    {
                                        date: new Date(item[0]).getDay(),
                                        hours: item[3],
                                        money: item[4],
                                    },
                                ],
                                total: item[4] ? item[4] : 0,
                            });
                        }
                    }
                });
            });
        calculateSum(personsObjects);
        setPersonsAndContracts(personsObjects);
    }, [data]);

    const DatesFunc = (contract: Contract, day: number) => {
        let element = contract.dates.find((item) => item.date === day);
        return element ? (
            <td className={'hours_and_money'}>
                {element.hours && parseFloat(element.hours).toFixed(2) + 'h'}{' '}
                {element.hours && element.money && '/'}{' '}
                {element.money && element.money + '$'}
            </td>
        ) : (
            <td></td>
        );
    };
    const calculateSum = (personsNContracts: Person[]) => {
        let tempWeek = [0, 0, 0, 0, 0, 0, 0];
        personsNContracts.forEach((item) => {
            item.contracts.forEach((contract) => {
                daysInWeek.forEach((day) => {
                    let element = contract.dates.find(
                        (item) => item.date === day
                    );
                    if (element) {
                        let sum = tempWeek[day - 1];
                        tempWeek[day - 1] = Number(
                            (+sum + Number(element.money)).toFixed(2)
                        );
                    }
                });
            });
        });
        setWeek(tempWeek);
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
                        <tr>
                            <th>Person</th>
                            <th>Contract</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                            <th>Total</th>
                        </tr>
                        {personsAndContracts.map((item) => (
                            <>
                                {item.contracts.map(
                                    (contract: Contract, index: number) => {
                                        return (
                                            <tr>
                                                {index === 0 ? (
                                                    <td
                                                        className={'name'}
                                                        rowSpan={
                                                            item.contracts
                                                                .length
                                                        }
                                                    >
                                                        {item.name}
                                                    </td>
                                                ) : (
                                                    ''
                                                )}
                                                <td className={'contract'}>
                                                    {contract.name}
                                                </td>
                                                {daysInWeek.map((day) =>
                                                    DatesFunc(contract, day)
                                                )}
                                                <td>{contract.total}</td>
                                            </tr>
                                        );
                                    }
                                )}
                            </>
                        ))}
                        <tr>
                            <td colSpan={2} className={'name'}>
                                Total $
                            </td>
                            {week.map((item) => (
                                <td>{item}</td>
                            ))}
                            <td>
                                {week
                                    .reduce((prev, curr) => +prev + +curr)
                                    .toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </TableWrapper>
            )}
        </div>
    );
}
const TableWrapper = styled.table`
    max-width: 1024px;
    margin: 0 auto;
`;
export default App;
