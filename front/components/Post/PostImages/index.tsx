import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  images: { src: string }[];
}

export const Base = styled.div<{ [key: string]: any }>`
  display: flex;
  width: ${({ width }) => width}px;
  //overflow-x: scroll;
`;

export const Image = styled.div`
  width: 470px;
  height: 470px;
  background-color: lightgray;
`;

const Images: FC<IProps> = ({ images }) => {
  const theme = useTheme();

  const data = [
    { id: 1, src: '/', PostId: 1 },
    { id: 2, src: '/', PostId: 2 },
  ];
  return (
    <Base theme={theme} width={data.length * 470}>
      {data?.map((v) => (
        <Image>{v.src}</Image>
      ))}
    </Base>
  );
};

export default Images;
