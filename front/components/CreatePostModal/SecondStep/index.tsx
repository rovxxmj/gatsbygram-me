import React, { FC, useContext } from 'react';
import Step from '@components/CreatePostModal/Step';
import styled from '@emotion/styled';
import { BsArrowLeft } from 'react-icons/bs';
import { PostContext } from '@components/CreatePostModal';
import PostImagesEditTool from '@components/CreatePostModal/PostImagesEditTool';

interface IProps {
  [key: string]: any;
}
export const Button = styled.button`
  //position: absolute;
`;
export const ImagePreview = styled.div`
  overflow-x: scroll;
  display: flex;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const SecondStep: FC<IProps> = ({ onClickPrev }) => {
  // 두번째 파일을 받는 곳
  const { id, images, setImages, onChange } = useContext(PostContext);
  return (
    <Step title={'편집하기'}>
      <span className={'step-button prev-button'} onClick={onClickPrev}>
        <BsArrowLeft />
      </span>
      <button className={'step-button submit-button'} type={'submit'}>
        다음
      </button>
      <ImagePreview className={'img-preview'}>
        {images?.map((image, idx) => (
          <img key={`big-img-${idx}`} src={`http://localhost:3095/${image.src}`} />
        ))}
      </ImagePreview>
      <PostImagesEditTool />
    </Step>
  );
};

export default SecondStep;
