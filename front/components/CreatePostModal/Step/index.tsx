import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
interface IProps {
  children: React.ReactNode;
  title: string;
}

export const Base = styled.div<{ [key: string]: any }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
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
    width: 100%;
    height: 100%;
  }

  & .step-button {
    position: absolute;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  & .prev-button {
    top: 6px;
    left: 20px;
    font-size: 26px;
  }

  & .submit-button {
    top: 11px;
    right: 20px;
    font-weight: 700;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.blue[500]};
  }

  & .post-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

export const Button = styled.button`
  position: absolute;
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
