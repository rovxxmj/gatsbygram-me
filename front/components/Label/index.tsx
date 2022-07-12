import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  content: string;
}

export const Base = styled.div<{ [key: string]: any }>`
  height: 38px;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  color: #fff;
  display: inline-block;
  border-radius: 5px;
`;

const Label: FC<IProps> = ({ content }) => {
  const theme = useTheme();
  return <Base>{content}</Base>;
};

export default Label;
