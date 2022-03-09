import React from 'react';
import { IContract, IPerson, IVacations } from '../@types/types';
import Person from './Person';
import { ContractBlock } from './ContractBlock';
import DatesFunc from './DatesFunc';
import HoursAndDollars from './HoursAndDollars';
interface Props {
    personsAndContracts: IPerson[];
    vacations: IVacations;
}
const MainRows: React.FC<Props> = ({ personsAndContracts, vacations }) => {
    const daysInWeek = [1, 2, 3, 4, 5, 6, 7];
    return (
        <>
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
                                        item.contracts.length === 1 ? 2 : 1
                                    }
                                >
                                    <HoursAndDollars
                                        time={contract.totalHours}
                                        money={contract.totalMoney}
                                    />
                                </td>
                                {item.contracts.length === 1 ? null : index ===
                                  0 ? (
                                    <td rowSpan={item.contracts.length}>
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
        </>
    );
};

export default MainRows;
