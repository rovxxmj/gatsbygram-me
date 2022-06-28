import React, { FC } from 'react';
import styled from '@emotion/styled';

interface IActionItem {
  icon: React.ReactNode;
  special?: boolean;
}

const Base = styled.div<{ special?: boolean }>`
  width: 40px;
  height: 40px;
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ special }) => (special ? '26px' : '22px')};
  ${({ special }) =>
    special &&
    `
    & svg {
       border-radius: 30%;
       font-size: 30px;
       // background: linear-gradient(45deg, #feda75, #fa7e1e , #d62976, #962fbf, #4f5bd5)
  }
  `}
`;
const ActionItem: FC<IActionItem> = ({ icon, special }) => {
  return <Base special={special}>{icon}</Base>;
};

export default ActionItem;
