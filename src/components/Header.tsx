import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderRow>
            <th>Person</th>
            <th>Contract</th>
            <HeaderCol>Mon</HeaderCol>
            <HeaderCol>Tue</HeaderCol>
            <HeaderCol>Wed</HeaderCol>
            <HeaderCol>Thu</HeaderCol>
            <HeaderCol>Fri</HeaderCol>
            <HeaderCol>Sat</HeaderCol>
            <HeaderCol>Sun</HeaderCol>
            <th colSpan={2}>Total</th>
        </HeaderRow>
    );
};

const HeaderRow = styled.tr`
    th {
        padding: 10px 0;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
        background: #f2f2f2;
        align-items: center;
    }
`;

const HeaderCol = styled.th`
    width: 72px;
`;

export default Header;
