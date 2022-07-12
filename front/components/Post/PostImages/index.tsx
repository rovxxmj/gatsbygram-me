import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  images: { src: string }[];
}

export const Base = styled.div<{ [key: string]: any }>`
  display: flex;
  overflow-x: scroll;
  width: 100%;
`;

export const Image = styled.img`
  width: 470px;
  height: 470px;
  background-color: lightgray;
`;

const Images: FC<IProps> = ({ images }) => {
  const theme = useTheme();

  return (
    <Base theme={theme}>
      {images?.map((image) => (
        <Image key={image.src} src={`http://localhost:3095/${image.src}`} />
      ))}
    </Base>
  );
};

export default Images;
