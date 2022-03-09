import { NameBlock } from './Name';
import React from 'react';
import styled from 'styled-components';
import {IPerson} from "../@types/types";

interface Props {
    index: number;
    item: IPerson;
}
const Person: React.FC<Props> = ({ index, item }) => {
    return (
        <>
            {index === 0 && (
                <NameBlock rowSpan={item.contracts.length}>
                    <Name avatarSrc={item.avatar}>
                        <Avatar src={item.avatar} avatarSrc={item.avatar} />
                        <div style={{display:'flex', flexDirection: 'column'}}>
                            <div>{item.name}</div>
                            {!item.avatar && <Id>id: {item.id}</Id>}
                        </div>
                    </Name>
                </NameBlock>
            )}
        </>
    );
};
const Id = styled.div`
  color: red;
  font-size: 11px;
`;
const Avatar = styled.img<{ avatarSrc: string | undefined }>`
    border: ${({ avatarSrc }) => (avatarSrc ? '' : '1px solid red')};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 8px;
`;
const Name = styled.div<{ avatarSrc: string | undefined }>`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
  color: ${({ avatarSrc }) => (avatarSrc ? '' : 'red')};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
export default Person;
