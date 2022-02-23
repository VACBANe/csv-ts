import { NameBlock } from './Name';
import TotalForTheWeek from './TotalForTheWeek';
import React from 'react';
import HoursAndDollars from './HoursAndDollars';
import styled from 'styled-components';

interface Props {
    weekMoney: number[];
    weekHours: number[][]
}

const TotalRow: React.FC<Props> = ({ weekMoney, weekHours }) => {
    return (
        <tr>
            <NameBlock>
                <TotalRowBlock>Total $</TotalRowBlock>
            </NameBlock>
            <td>{null}</td>
            {weekMoney.map((item, index) => (
                <td key={index}>
                    <HoursAndDollars time={weekHours[index]} money={item} />
                </td>
            ))}
            <TotalForTheWeek weekMoney={weekMoney} weekHours={weekHours} />
        </tr>
    );
};

const TotalRowBlock = styled.div`
    margin: 12px 8px;
`;
export default TotalRow;
