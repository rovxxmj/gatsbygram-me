import React, { FC } from 'react';
import Step from '@components/CreatePostModal/Step';
import styled from '@emotion/styled';
import { BsArrowLeft } from 'react-icons/bs';

interface IProps {
  [key: string]: any;
}
export const Button = styled.button`
  //position: absolute;
`;
export const ImagePreview = styled.div`
  & img {
    width: 100%;
    height: 100%;
  }
`;
const SecondStep: FC<IProps> = ({ src, onClickPrev }) => {
  console.log({ src }, 'zzzz');
  // 두번째 파일을 받는 곳

  return (
    <Step title={'편집하기 - 두번째 단계'}>
      <span className={'step-button prev-button'} onClick={onClickPrev}>
        <BsArrowLeft />
      </span>
      <button className={'step-button submit-button'} type={'submit'}>
        다음
      </button>
      <ImagePreview className={'img-preview'}>
        <img src={src} />
        {/*<img src={`http://localhost:3095/${src}`} />*/}
      </ImagePreview>
    </Step>
  );
};

export default SecondStep;
