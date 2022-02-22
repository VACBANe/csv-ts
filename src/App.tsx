import styled from 'styled-components';
import { SetStateAction, useEffect, useState } from 'react';
import Papa from 'papaparse';

import './App.css';
import DragAndDrop from './DragAndDrop';
import changeDateFormat from './utils/ChangeDateFormat';
import Header from './components/Header';
import { Block } from './components/Block';
import { ContractBlock, ContractText } from './components/Contract';
import HoursAndDollars from './components/HoursAndDollars';
import TotalRow from './components/TotalRow';
import Person from './components/Person';
import DatesFunc from './components/DatesFunc';
import { Contract, IPerson } from './@types/types';

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState<any[]>([]);
    const [personsAndContracts, setPersonsAndContracts] = useState<any[]>([]);
    const [week, setWeek] = useState([
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]); //сумма по дням
    const daysInWeek = [1, 2, 3, 4, 5, 6, 7];

    //берем файл в драгндропа
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
        //создаем обьекты юзеров
        uniquePersons.forEach((person) => {
            personsObjects.push({
                id: person.match(/\(\w+\)/)![0].replace(/[()]/g, ''),
                name: person.replace(/\(\w+\)/, ' ').trim(),
                contracts: [],
                totalMoney: 0,
                totalHours: 0,
                avatar: 'https://html5css.ru/css/img_lights.jpg',
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
                                hours: (+item[3]).toFixed(2),
                                money: item[4],
                            });
                            element.totalMoney = (
                                +element.totalMoney + +item[4]
                            ).toFixed(2);
                            person.totalMoney = (
                                +person.totalMoney + +item[4]
                            ).toFixed(2);
                            element.totalHours = (
                                +element.totalHours + +item[3]
                            ).toFixed(2);
                            person.totalHours = (
                                +person.totalHours + +item[3]
                            ).toFixed(2);
                        } else {
                            person.contracts.push({
                                name: item[2].replace(/\(\w+\)/, ' ').trim(),
                                id: item[2]
                                    .match(/\(\w+\)/)[0]
                                    .replace(/[()]/g, ''),
                                dates: [
                                    {
                                        date: item[0],
                                        hours: (+item[3]).toFixed(2),
                                        money: item[4],
                                    },
                                ],
                                totalMoney: item[4] ? item[4] : 0,
                                totalHours: item[3] ? (+item[3]).toFixed(2) : 0,
                            });
                            person.totalMoney = (
                                +person.totalMoney + +item[4]
                            ).toFixed(2);
                            person.totalHours = (
                                +person.totalHours + +(+item[3]).toFixed(2)
                            ).toFixed(2);
                        }
                    }
                });
            });
        calculateSum(personsObjects);
        setPersonsAndContracts(personsObjects);
    }, [data]);

    const calculateSum = (personsNContracts: IPerson[]) => {
        let tempWeek = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        personsNContracts.forEach((item) => {
            item.contracts.forEach((contract) => {
                daysInWeek.forEach((day) => {
                    let element;
                    element = contract.dates.find(
                        (item) => item.date === day
                    );
                    if (element) {
                        let sumMoney = tempWeek[day - 1][0];
                        let sumHours = tempWeek[day - 1][1];
                        tempWeek[day - 1][0] = +(
                            +sumMoney + Number(element.money)
                        ).toFixed(2);
                        tempWeek[day - 1][1] = +(
                            +sumHours + Number(element.hours)
                        ).toFixed(2);
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
                        <Header />
                        {personsAndContracts.map((item) => {
                            return item.contracts.map(
                                (contract: Contract, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <Person index={index} item={item} />
                                            <ContractBlock>
                                                <ContractText>
                                                    {contract.name}
                                                </ContractText>
                                            </ContractBlock>
                                            {daysInWeek.map((day, index) =>
                                                DatesFunc(contract, day, index)
                                            )}
                                            <Block
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
                                            </Block>
                                            {item.contracts.length ===
                                            1 ? null : index === 0 ? (
                                                <Block
                                                    rowSpan={
                                                        item.contracts.length
                                                    }
                                                >
                                                    <HoursAndDollars
                                                        time={item.totalHours}
                                                        money={item.totalMoney}
                                                    />
                                                </Block>
                                            ) : null}
                                        </tr>
                                    );
                                }
                            );
                        })}
                        <TotalRow week={week} />
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
