import React, { FC } from 'react';
// import { Base, Label, Title } from '@pages/sign_in/AniLabel/styles';

import styled from '@emotion/styled';

export const Base = styled.div`
  margin-bottom: 10px;
`;
export const Label = styled.div<{ isValue: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  > .title {
    transition: 0.1s ease;
    top: ${({ isValue }) => (isValue ? '26%' : '50%')};
    // top: ${(props) => (props.isValue ? '26%' : '50%')};
    font-size: ${({ isValue }) => (isValue ? '10px' : '14px')};
  }

  > input {
    padding: ${({ isValue }) => (isValue ? '22px 14px 6px' : '14px')};
  }
`;
export const Title = styled.span`
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: gray;
`;

interface IProps {
  title: string;
  children: React.ReactNode;
  isValue: boolean;
}

const AniLabel: FC<IProps> = ({ title, children, isValue }) => {
  return (
    <Base>
      <Label isValue={isValue}>
        <Title className="title">{title}</Title>
        {children}
      </Label>
    </Base>
  );
};

export default AniLabel;
