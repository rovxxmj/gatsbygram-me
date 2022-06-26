import React, { CSSProperties, FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
interface IProps {
  style?: CSSProperties;
  icon: React.ReactNode;
  onClick: () => void;
  [key: string]: any;
}

const Button = styled.button<{ [key: string]: any }>`
  border: none;
  cursor: pointer;
  width: 46px;
  height: 46px;
  border-radius: 4px;
  margin: 0 5px;
  color: #fff;
  font-size: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  & svg {
    font-size: ${({ kakao }) => (kakao ? '18px' : '20px')};
    color: ${({ kakao, theme }) => (kakao ? '#21252b' : 'inherit')};
  }
`;
const Social: FC<IProps> = ({ style, icon, onClick, kakao }) => {
  const theme = useTheme();
  return (
    <Button style={style} onClick={onClick} kakao={kakao}>
      {icon}
    </Button>
  );
};

export default Social;
