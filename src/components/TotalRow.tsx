import { NameBlock } from './Name';
import TotalForTheWeek from './TotalForTheWeek';
import React from 'react';
import HoursAndDollars from './HoursAndDollars';
import styled from 'styled-components';

interface Props {
    week: number[][];
}

const TotalRow: React.FC<Props> = ({ week }) => {
    return (
        <tr>
            <NameBlock>
                <TotalRowBlock>Total $</TotalRowBlock>
            </NameBlock>
            <td>{null}</td>
            {week.map((item, index) => (
                <td key={index}>
                    <HoursAndDollars time={item[1]} money={item[0]} />
                </td>
            ))}
            <TotalForTheWeek week={week} />
        </tr>
    );
};

const TotalRowBlock = styled.div`
    margin: 12px 8px;
`;
export default TotalRow;
