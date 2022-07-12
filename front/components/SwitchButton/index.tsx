import React, { Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  [key: string]: any;
}

interface IRest {
  [key: string]: any;
}
export const Base = styled.div<IRest>``;
export const Switch = styled.label<IRest>`
  position: relative;
  width: 54px;
  padding: 3px;
  border-radius: 20px;
  display: block;
  transition: 0.5s ease;
  background-color: ${({ theme, active }) => (active ? theme.colors.blue[400] : theme.colors.gray[300])};

  & .slider {
    cursor: pointer;
    border-radius: 34px;
    transition: 0.4s;
    display: block;
    width: 23px;
    height: 23px;
    background-color: #fff;

    & input {
      display: none;
    }
  }

  & input:checked + .slider {
    //background-color: black;
    transform: translateX(100%);
  }

  & .switch ~ input:checked {
    background-color: ${({ theme }) => theme.colors.blue[400]};
  }
`;

const SwitchButton: FC<IProps> = ({ value, setValue }) => {
  const theme = useTheme();
  const onChange = useCallback((e: any) => {
    setValue(e.target.checked);
  }, []);
  return (
    <Base>
      <Switch theme={theme} active={value} onClick={onChange}>
        <div className={'switch'}>
          <input type={'checkbox'} value={value} onChange={onChange} hidden />
          <span className={'slider'}></span>
        </div>
      </Switch>
    </Base>
  );
};

export default SwitchButton;
