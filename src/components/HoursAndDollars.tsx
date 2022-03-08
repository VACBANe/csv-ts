import React from 'react';
import styled from 'styled-components';

interface Props {
    time?: number[];
    money?: string | number;
}

const HoursAndDollars: React.FC<Props> = ({ time, money }) => {
    let t, m;
    if (time) {
        if (time[1] === 0) {
            if (time[0] !== 0) t = time[0] + ':' + time[1] + '0';
        } else {
            t = time[0] + ':' + time[1];
        }
    }
    if (money) {
        m = Number(money).toFixed(2);
        if (typeof money === 'string')
            if (m.split('.')[1] === '00') m = m.split('.')[0];
    }
    return (
        <div>
            {m && +m !== 0 ? <Money>{m}$</Money> : ''}
            {t && <Hours>{t}</Hours>}
        </div>
    );
};
const Money = styled.div`
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-size: 12px;
`;
const Hours = styled.div`
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    line-height: 16px;
`;

export default HoursAndDollars;
