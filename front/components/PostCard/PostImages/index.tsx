import { IPost } from '@typings/db';
import { FC, useCallback, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IProps {
  images: { src: string }[];
}

import styled from '@emotion/styled';
import ImagesZoom from '@components/PostCard/ImagesZoom';
import Slider from 'react-slick';

export const Base = styled.div`
  > img {
    width: 100%;
    height: auto;
  }
`;

const PostImages: FC<IProps> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const settings = {
    initialSlide: 0,
    afterChange: (slide: number) => setCurrentSlide(slide),
    infinite: true,
    arrows: false,
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 1,
  };

  return (
    <Base>
      <Slider {...settings}>
        {images.map((image) => (
          <img src={image.src} key={image.src} />
        ))}
      </Slider>
    </Base>
  );
};

export default PostImages;
