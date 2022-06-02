import { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';

interface IImage {
  src: string;
}

interface IProps {
  images: IImage[];
}
export const Base = styled.div`
  width: 700px;
  height: 700px;
`;

const PostImages: FC<IProps> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  if (images.length === 1) {
    return (
      <Base>
        <img role={'presentation'} src={images[0].src} alt={images[0].src} onClick={onZoom} />
      </Base>
    );
  }

  if (images.length === 2) {
    return (
      <Base>
        <img role={'presentation'} width={'50%'} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <img role={'presentation'} width={'50%'} src={images[1].src} alt={images[0].src} onClick={onZoom} />
      </Base>
    );
  }

  return (
    <Base>
      <img role={'presentation'} width={'50%'} src={images[0].src} alt={images[0].src} onClick={onZoom} />
      <div
        role={'presentation'}
        style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
        onClick={onZoom}
      >
        <span>{images.length - 1}개의 사진 더보기</span>
      </div>
    </Base>
  );
};

export default PostImages;
