import React from 'react';
import HoursAndDollars from './HoursAndDollars';
import { IContract } from '../@types/types';

const DatesFunc = (contract: IContract, day: number, index: number) => {
    let element = contract.dates.find((item) => item.date === day);
    return element ? (
        <td key={index}>
            <HoursAndDollars time={element.hours} money={element.money} />
        </td>
    ) : (
        <td key={index}>{null}</td>
    );
};

export default DatesFunc;
