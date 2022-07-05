import React, { FC, useCallback, useContext } from 'react';
import Step from '@components/CreatePostModal/Step';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { PostContext } from '@components/CreatePostModal';

interface IProps {
  [key: string]: any;
}

const FileDropper = styled.div<{ [key: string]: any }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .text {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  & .select-button {
    border: none;
    background-color: ${({ theme }) => theme.colors.blue[500]};
    font-size: 13px;
    font-weight: 600;
    padding: 6px 10px 5px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
`;
const FirstStep: FC<IProps> = ({}) => {
  // 첫번째 파일을 받는 곳
  // 여러 이미지 업로드 기능으로 바꿀 것

  const theme = useTheme();
  const { id, onChange } = useContext(PostContext);
  return (
    <Step title={'새 게시물 만들기'}>
      <FileDropper theme={theme}>
        <span className={'text'}>사진과 동영상을 여기에 끌어다 놓으세요</span>
        <label>
          <input id={id} type={'file'} multiple accept={'image/*'} onChange={onChange} hidden />
          <span className={'select-button'}>컴퓨터에서 선택</span>
        </label>
      </FileDropper>
    </Step>
  );
};

export default FirstStep;
