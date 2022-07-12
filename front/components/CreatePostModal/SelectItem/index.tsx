import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown } from 'react-icons/io';
import { useTheme } from '@emotion/react';

interface IProps {
  title: string;
  [key: string]: any;
}
export const Base = styled.div<{ [key: string]: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  padding: 0 20px;
  cursor: pointer;

  & .name {
    font-weight: 600;
  }

  & .icon {
    font-size: 22px;
    transition: 0.2s;
    transform: ${({ active }) => (active ? `rotate(180deg)` : `rotate(0deg)`)};
  }
`;

const SelectItem: FC<IProps> = ({ title, onClick, show }) => {
  const theme = useTheme();
  return (
    <Base onClick={onClick} active={show}>
      <span className={'name'}>{title}</span>
      <span className={'icon'}>
        <IoIosArrowDown />
      </span>
    </Base>
  );
};

export default SelectItem;
