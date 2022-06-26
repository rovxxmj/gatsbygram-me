import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IRest } from '@pages/SignIn';

interface IProps {
  title: string;
  content?: string | React.ReactNode;
}

export const Base = styled.div<IRest>`
  margin-bottom: 40px;
  & p {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`;
export const Title = styled.h2`
  font-size: 23px;
  font-weight: 600;
`;

export const Content = styled.p`
  margin-top: 5px;
`;

const Header: FC<IProps> = ({ title, content }) => {
  const theme = useTheme();
  return (
    <Base theme={theme}>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Base>
  );
};

export default Header;
