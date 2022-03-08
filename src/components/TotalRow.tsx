import { NameBlock } from './Name';
import TotalForTheWeek from './TotalForTheWeek';
import React from 'react';
import HoursAndDollars from './HoursAndDollars';
import styled from 'styled-components';

interface Props {
    weekMoney: number[];
    weekHours: number[][];
    vacations: any;
}

const TotalRow: React.FC<Props> = ({ weekMoney, weekHours, vacations }) => {
    return (
        <tr>
            <NameBlock>
                <TotalRowBlock>Total $</TotalRowBlock>
            </NameBlock>
            <td>{null}</td>
            {weekMoney.map((item, index) => {
                let holiday = false;
                vacations &&
                    vacations.holidays &&
                    vacations.holidays.forEach((it: any) => {
                        if (
                            (new Date(it.date).getDay() === 0
                                ? 7
                                : new Date(it.date).getDay()) ===
                            index + 1
                        ) {
                           holiday = true;
                        }
                    });
                return  holiday ? (
                    <Holiday key={index}>
                        <HoursAndDollars time={weekHours[index]} money={item} />
                    </Holiday>
                ) : <Block key={index}>
                    <HoursAndDollars time={weekHours[index]} money={item} />
                </Block>;
            })}
            <TotalForTheWeek weekMoney={weekMoney} weekHours={weekHours} />
        </tr>
    );
};

const TotalRowBlock = styled.div`
    margin: 12px 8px;
`;
const Holiday = styled.td`
  background: repeating-linear-gradient( -45deg, #f0f0f0, #f0f0f0 2px, #f8f8f8 2px, #f8f8f8 6px );
`;
const Block = styled.td`
`;

export default TotalRow;
