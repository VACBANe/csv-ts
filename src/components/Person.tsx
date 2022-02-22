import { NameBlock } from './Name';
import React from 'react';
import styled from 'styled-components';

interface Props {
    index: number;
    item: any;
}
const Person: React.FC<Props> = ({ index, item }) => {
    return (
        <>
            {index === 0 && (
                <NameBlock rowSpan={item.contracts.length}>
                    <Name>
                        <Avatar src={item.avatar} />
                        {item.name}
                    </Name>
                </NameBlock>
            )}
        </>
    );
};

const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 5px 8px;
`;
const Name = styled.div`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
export default Person;
