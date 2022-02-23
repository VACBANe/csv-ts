import React from 'react';
import HoursAndDollars from "./HoursAndDollars";
import sumTimes from "../utils/sumTimes";

interface Props {
    weekMoney: number[];
    weekHours: number[][]
}

const TotalForTheWeek: React.FC<Props> = ({ weekMoney, weekHours }) => {
    return (
        <td colSpan={2}>
            <HoursAndDollars
                time={weekHours.reduce((prev, curr) => sumTimes(prev, curr), [0,0])}
                money={weekMoney.reduce((prev, curr) => +prev + +curr, 0)}
            />
        </td>
    );
};

export default TotalForTheWeek;
