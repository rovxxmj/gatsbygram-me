import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  children: React.ReactNode;
  title: string;
}

export const Base = styled.div<{ [key: string]: any }>`
  & .title {
    padding-top: 4px;
    font-size: 16px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  & .content {
  }
`;

const Step: FC<IProps> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Base theme={theme}>
      <h2 className={'title'}>{title}</h2>
      <div className={'content'}>{children}</div>
    </Base>
  );
};

export default Step;
