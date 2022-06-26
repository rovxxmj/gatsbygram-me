import React, { CSSProperties, FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
interface IProps {
  style: CSSProperties;
  onClick?: () => void;
  [key: string]: any;
}

const Button = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const CloseButton: FC<IProps> = ({ style, onClick }) => {
  return (
    <Button style={style} onClick={onClick}>
      <IoCloseOutline />
    </Button>
  );
};

export default CloseButton;
