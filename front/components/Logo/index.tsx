import React, { CSSProperties, FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
interface IProps {
  style?: CSSProperties;
  [key: string]: any;
}

const Base = styled.h1`
  font-family: 'Space Mono', monospace;
  font-weight: 800;
  font-size: 24px;
`;
const Logo: FC<IProps> = ({ style }) => {
  return <Base style={style}>Instagram</Base>;
};

export default Logo;
