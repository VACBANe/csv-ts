import React from 'react';
import styled from 'styled-components';

interface Props {
    time?: string | number;
    money?: string | number;
}

const HoursAndDollars: React.FC<Props> = ({ time, money }) => {
    let t, m;
    console.log(time)
    if (time) {
        let timestamp = +(+time).toFixed(2) * 60;
        // let temptimestamp = timestamp * 60 * 1000;
        // timestamp = (Math.floor(temptimestamp/(60*1000)) *(60*1000))/60000;//округление
        let hours = Math.trunc(timestamp / 60);
        let minutes = (timestamp % 60).toFixed();
        if(+minutes < 10) minutes = '0' + minutes
        if (hours === 0) {
            if (+minutes !== 0) t = `0:${minutes}`;
        } else {
            t = +minutes !== 0 ? `${hours}:${minutes}` : hours;
        }
    }
    if (money !== undefined) {
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
