import styled from 'styled-components';
import React, { useState } from 'react';

interface Props {
    vacation: string;
}

const VacationBlock: React.FC<Props> = ({ children, vacation }) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <HeaderCol onClick={() => setIsOpened(!isOpened)}>
            {children}
            {isOpened && (
                <HolidayName>
                    <Name>{vacation}</Name>
                </HolidayName>
            )}
        </HeaderCol>
    );
};

const HeaderCol = styled.th`
    cursor: pointer;
    width: 72px;
    position: relative;
`;
const HolidayName = styled.div`
    z-index: 1;
    border: 1px solid #6e6e6e;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    :before {
        content: '';
        position: absolute;
        background: #f0f0f0;
        border: 1px solid black;
        left: 50%;
        bottom: -8px;
        transform: translateX(-50%) rotate(45deg);
        width: 15px;
        height: 15px;
        z-index: -1;
    }
`;

const Name = styled.div`
    background-color: #f0f0f0;
`;
export default VacationBlock;
