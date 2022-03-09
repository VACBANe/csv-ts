import React from 'react';
import HoursAndDollars from './HoursAndDollars';
import {IContract, IVacations} from '../@types/types';
import styled from 'styled-components';

const DatesFunc = (
    contract: IContract,
    day: number,
    personId: string,
    vacations: IVacations,
    index: number,
    contractNum: number
) => {
    const element = contract.dates.find((item) => item.date === day);
    let isHoliday = false;
    vacations.holidays.forEach((it) => {
        if (
            (new Date(it.date).getDay() === 0
                ? 7
                : new Date(it.date).getDay()) === day
        ) {
            isHoliday = true;
        }
    });
    for (const key in vacations) {
        // @ts-ignore
        const vacation = vacations[key].find((vac) => {
            if (vac.date) {
                return (
                    vac.personId === personId &&
                    day ===
                        (new Date(vac.date).getDay() === 0
                            ? 7
                            : new Date(vac.date).getDay())
                );
            }
            if (vac.startDate) {
                let i = new Date(vac.startDate).getTime();
                while (i <= new Date(vac.endDate).getTime()) {
                    if (
                        vac.personId === personId &&
                        day ===
                            (new Date(i).getDay() === 0
                                ? 7
                                : new Date(i).getDay())
                    )
                        return true;
                    i += 24 * 60 * 60 * 1000;
                }
            }
        });
        if (vacation) {
            if (key === 'vacations' || key === 'sickLeaves') {
                if (isHoliday) {
                    return element ? (
                        <Holiday key={index}>
                            <HoursAndDollars
                                time={element.hours}
                                money={element.money}
                            />
                            {key === 'vacations' ? (
                                <Circle color={'blue'}>{null}</Circle>
                            ) : (
                                <Circle color={'red'}>{null}</Circle>
                            )}
                        </Holiday>
                    ) : (
                        <Holiday key={index}>{null}</Holiday>
                    );
                } else {
                    return element ? (
                        <Block contract={contractNum} key={index}>
                            <HoursAndDollars
                                time={element.hours}
                                money={element.money}
                            />
                            {key === 'vacations' ? (
                                <Circle color={'blue'}>{null}</Circle>
                            ) : (
                                <Circle color={'red'}>{null}</Circle>
                            )}
                        </Block>
                    ) : (
                        <Block contract={contractNum} key={index}>
                            {null}
                        </Block>
                    );
                }
            }
        }
    }
    if (isHoliday) {
        return element ? (
            <Holiday key={index}>
                <HoursAndDollars time={element.hours} money={element.money} />
            </Holiday>
        ) : (
            <Holiday key={index}>{null}</Holiday>
        );
    } else {
        return element ? (
            <Block contract={contractNum} key={index}>
                <HoursAndDollars time={element.hours} money={element.money} />
            </Block>
        ) : (
            <Block contract={contractNum} key={index}>
                {null}
            </Block>
        );
    }
};

const Block = styled.td<{ contract: number }>`
`;

const Circle = styled.div<{ color: string }>`
    width: 5px;
    height: 5px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    float: right;
    margin-right: 5px;
`;
const Holiday = styled.td`
  background: repeating-linear-gradient( -45deg, #f0f0f0, #f0f0f0 2px, #f8f8f8 2px, #f8f8f8 6px );
`;
export default DatesFunc;
