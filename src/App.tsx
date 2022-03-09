import styled from 'styled-components';
import { SetStateAction, useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

import './App.css';
import DragAndDrop from './DragAndDrop';
import changeDateAndTimeFormat from './utils/ChangeDateAndTimeFormat';
import Header from './components/Header';
import TotalRow from './components/TotalRow';
import { dataType, IDataBase, IPerson, IVacations } from './@types/types';

// @ts-ignore
import blob from './users.csv';
import { GetDateInterval } from './utils/GetDateInterval';
import { FormatVacations } from './utils/FormatVacations';
import { calculateSum } from './utils/CalculateSum';
import MainRows from './components/MainRows';
import { FormatPersonsAndContracts } from './utils/FormatPersonsAndContracts';
import {DropHere} from "./components/DropHere";

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState<dataType>([]);
    const [personsAndContracts, setPersonsAndContracts] = useState<
        Array<IPerson>
    >([]);
    const [database, setDataBase] = useState<IDataBase>({});
    const [vacations, setVacations] = useState<IVacations>({
        vacations: [],
        holidays: [],
        sickLeaves: [],
    });
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

    useEffect(() => {
        Papa.parse(blob, {
            download: true,
            complete: function (input) {
                const records = input.data;
                const tempdatabase: IDataBase = {};
                // @ts-ignore
                records.forEach((person: string[]) => {
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
    useEffect(() => {
        if (selectedFile) {
            Papa.parse(selectedFile, {
                complete: async function ({
                    data,
                }: ParseResult<[number, string, string, number[], string]>) {
                    await GetDateInterval(data).then((res) => {
                        if (res !== undefined)
                            setVacations(FormatVacations(res));
                    });
                    setData(changeDateAndTimeFormat(data));
                },
            });
        }
    }, [selectedFile]);
    useEffect(() => {
        const personsObjects = FormatPersonsAndContracts(
            data,
            setPersonsAndContracts,
            database
        );
        calculateSum(personsObjects, setWeekMoney, setWeekHours);
    }, [data]);
    return (
        <div className="App">
            <DragAndDrop
                handleDrop={(files: SetStateAction<undefined>[]) =>
                    setSelectedFile(files[0])
                }
            />
            {selectedFile ? (
                <TableWrapper>
                    <tbody>
                        <Header vacations={vacations} />
                        <MainRows
                            vacations={vacations}
                            personsAndContracts={personsAndContracts}
                        />
                        <TotalRow
                            weekHours={weekHours}
                            weekMoney={weekMoney}
                            vacations={vacations}
                        />
                    </tbody>
                </TableWrapper>
            ): <DropHere style={{opacity: 0.1}}>Drop here</DropHere>}
        </div>
    );
}

const TableWrapper = styled.table`
    width: 1024px;
    margin: 0 auto;
`;
export default App;
