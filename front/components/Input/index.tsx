import React, { FC } from 'react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useTheme } from '@emotion/react';
import { Base } from '@components/Input/styles';
interface IProps {
  type: string;
  label: string;
  show?: boolean;
  isValue: boolean;
  isInValid: boolean;
  [key: string]: any;
}

const Input: FC<IProps> = ({ type = 'text', label, show = true, isValue, isInValid, register, rest }) => {
  const theme = useTheme();
  return (
    <Base isValue={isValue} show={show} theme={theme}>
      <label>
        {show && <span className={'label'}>{label}</span>}
        <input type={type} {...register} {...rest} />
        {show && isValue && !isInValid && (
          <span className={'validation valid'}>
            <IoCheckmarkCircle />
          </span>
        )}
        {show && isValue && isInValid && (
          <span className={'validation inValid'}>
            <IoCloseCircle />
          </span>
        )}
      </label>
    </Base>
  );
};

export default Input;
