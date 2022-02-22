import React from 'react';
import { Block } from './Block';
import HoursAndDollars from "./HoursAndDollars";

interface Props {
    week: number[][];
}

const TotalForTheWeek: React.FC<Props> = ({ week }) => {
    return (
        <Block colSpan={2}>
            <HoursAndDollars
                time={week.reduce((prev, curr) => +prev + +curr[1], 0)}
                money={week.reduce((prev, curr) => +prev + +curr[0], 0)}
            />
        </Block>
    );
};

export default TotalForTheWeek;
