import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderRow>
            <th>Person</th>
            <th>Contract</th>
            <HeaderColumn>Mon</HeaderColumn>
            <HeaderColumn>Tue</HeaderColumn>
            <HeaderColumn>Wed</HeaderColumn>
            <HeaderColumn>Thu</HeaderColumn>
            <HeaderColumn>Fri</HeaderColumn>
            <HeaderColumn>Sat</HeaderColumn>
            <HeaderColumn>Sun</HeaderColumn>
            <th colSpan={2}>Total</th>
        </HeaderRow>
    );
};

const HeaderRow = styled.tr`
    & th {
        padding: 10px 0;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
    }
`;

const HeaderColumn = styled.th`
    width: 72px;
`;

export default Header;
