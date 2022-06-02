import { FC, useState } from 'react';
import Modal from '@components/Modal';
import Slider from 'react-slick';
interface IProps {
  images: { src: string }[];
  onClose: () => void;
}

const ImagesZoom: FC<IProps> = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div>
      <header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>닫기</button>
      </header>
      <div>
        <div>
          <Slider
            initialSlide={0}
            afterChange={(slide: number) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <img src={image.src} alt={image.src} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImagesZoom;
