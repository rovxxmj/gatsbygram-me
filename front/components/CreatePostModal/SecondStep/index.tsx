import React, { FC, useCallback, useContext, useState } from 'react';
import Step from '@components/CreatePostModal/Step';
import styled from '@emotion/styled';
import { BsArrowLeft } from 'react-icons/bs';
import { CreatePostContext } from '@components/CreatePostModal';
import PostImagesEditTool from '@components/CreatePostModal/PostImagesEditTool';
import { TbBoxMultiple } from 'react-icons/tb';

interface IProps {
  [key: string]: any;
}
export const Button = styled.button`
  //position: absolute;
`;
export const ImagePreview = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 700px;
  height: 700px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ToolButton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  transition: 0.2s ease;
  cursor: pointer;
  position: absolute;
  right: 26px;
  bottom: 26px;
  //display: flex;
  flex-direction: column;
  //align-items: flex-end;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[500]};
  }
`;
const SecondStep: FC<IProps> = ({ onClickPrev }) => {
  // 두번째 파일을 받는 곳
  const { id, imageUrls, onChange } = useContext(CreatePostContext);
  const [showImagesEditTool, setShowImagesEditTool] = useState(false);
  const onClickHideButton = useCallback(() => {
    setShowImagesEditTool((prev) => !prev);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowImagesEditTool(false);
  }, []);
  return (
    <Step title={'편집하기'}>
      <span className={'step-button prev-button'} onClick={onClickPrev}>
        <BsArrowLeft />
      </span>
      <button className={'step-button submit-button'} type={'submit'}>
        다음
      </button>
      <ImagePreview className={'img-preview'}>
        {imageUrls?.map((image, idx) => (
          <img key={`big-img-${idx}`} src={image.src} />
        ))}
      </ImagePreview>

      <PostImagesEditTool show={showImagesEditTool} onCloseModal={onCloseModal} />
      <ToolButton className={'hide-button'} onClick={onClickHideButton}>
        <TbBoxMultiple />
      </ToolButton>
    </Step>
  );
};

export default SecondStep;
