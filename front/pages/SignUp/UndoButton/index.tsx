import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IRest } from '@pages/SignIn';

interface IProps {
  onClick: () => void;
}

const Button = styled.span<IRest>`
  margin: 15px 0;
  display: block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.blue[500]};
`;
const UndoButton: FC<IProps> = ({ onClick }) => {
  const theme = useTheme();
  return <Button onClick={onClick}>돌아가기</Button>;
};

export default UndoButton;
