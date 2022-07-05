import React, { FC, useCallback, useContext, useState } from 'react';
import Step from '@components/CreatePostModal/Step';
import styled from '@emotion/styled';
import { BsArrowLeft } from 'react-icons/bs';
import { PostContext } from '@components/CreatePostModal';
import PostImagesEditTool from '@components/CreatePostModal/PostImagesEditTool';
import { TbBoxMultiple } from 'react-icons/tb';
import { ImagePreview } from '@components/CreatePostModal/SecondStep';
import UserInfoBar from '@components/UserInfoBar';

interface IProps {
  [key: string]: any;
}

export const Content = styled.div`
  width: 400px;
  height: 700px;
  background-color: #fff;
`;

const ThirdStep: FC<IProps> = () => {
  // 두번째 파일을 받는 곳
  const { id, imageUrls, onChange, setStep } = useContext(PostContext);
  const onClickPrev = useCallback(() => {
    setStep(2);
  }, []);
  return (
    <Step title={'새 게시글 만들기'}>
      <span className={'step-button prev-button'} onClick={onClickPrev}>
        <BsArrowLeft />
      </span>
      <button className={'step-button submit-button'} type={'submit'}>
        다음
      </button>
      <div className={'post-container'}>
        <ImagePreview className={'img-preview'}>
          {imageUrls?.map((image, idx) => (
            <img key={`big-img-${idx}`} src={image.src} />
          ))}
        </ImagePreview>

        <Content>
          <UserInfoBar />
        </Content>
      </div>
    </Step>
  );
};

export default ThirdStep;
