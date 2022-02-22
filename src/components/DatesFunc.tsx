import React from 'react';
import { Block } from './Block';
import HoursAndDollars from './HoursAndDollars';
import { Contract } from '../@types/types';

const DatesFunc = (contract: Contract, day: number, index: number) => {
    let element = contract.dates.find((item) => item.date === day);
    return element ? (
        <Block key={index}>
            <HoursAndDollars time={element.hours} money={element.money} />
        </Block>
    ) : (
        <td key={index}>{null}</td>
    );
};

export default DatesFunc;
