import styled from 'styled-components';

export const ContractBlock = styled.td`
    width: 184px;
`;

export const ContractText = styled.div`
  text-overflow: ellipsis; //образка длинных блоков с текстом
  overflow: hidden; //прятать выходящий за пределы текст
  white-space: nowrap; //запрет на перенос текста
  margin: 13px 12px;
  width: 160px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  text-align: start;
`;