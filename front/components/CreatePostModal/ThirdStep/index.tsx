import React, { FC, useCallback, useContext, useState } from 'react';
import Step from '@components/CreatePostModal/Step';
import styled from '@emotion/styled';
import { BsArrowLeft } from 'react-icons/bs';
import { CreatePostContext } from '@components/CreatePostModal';
import PostImagesEditTool from '@components/CreatePostModal/PostImagesEditTool';
import { TbBoxMultiple } from 'react-icons/tb';
import { ImagePreview } from '@components/CreatePostModal/SecondStep';
import UserInfoBar from '@components/UserInfoBar';
import SwitchButton from '@components/SwitchButton';
import SelectItem from '@components/CreatePostModal/SelectItem';
import { IoLocationOutline } from 'react-icons/io5';
import useInput from '@hooks/useInput';
interface IProps {
  [key: string]: any;
}

export const Content = styled.div`
  width: 400px;
  height: 700px;
  background-color: #fff;
  & textarea {
    resize: none;
    width: 100%;
    height: 200px;
    padding: 0 20px;
    font-size: 15px;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  & .select-item {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
    display: flex;
    align-items: center;
    justify-content: space-between;

    & input {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 15px;

      &:focus {
        outline: none;
      }
    }

    & .icon {
      font-size: 22px;
    }
  }

  & .select-item-detail {
    padding: 0 20px;
    margin-bottom: 30px;
    & .header {
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    & p {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.gray[500]};
    }
  }
`;

const ThirdStep: FC<IProps> = ({ register }) => {
  // 두번째 파일을 받는 곳
  const {
    id,
    imageUrls,
    onChange,
    setStep,
    location,
    onChangeLocation,
    setLocation,
    content,
    onChangeContent,
    setContent,
    hideCounts,
    setHideCounts,
    turnOffComments,
    setTurnOffComments,
  } = useContext(CreatePostContext);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const onClickPrev = useCallback(() => {
    setStep(2);
  }, []);
  const onClickAdvanced = useCallback(() => {
    setShowAdvanced((prev) => !prev);
  }, []);
  const onClickApproach = useCallback(() => {
    setShowApproach((prev) => !prev);
  }, []);

  return (
    <Step title={'새 게시글 만들기'}>
      <span className={'step-button prev-button'} onClick={onClickPrev}>
        <BsArrowLeft />
      </span>
      <button className={'step-button submit-button'} type={'submit'}>
        공유하기
      </button>
      <div className={'post-container'}>
        <ImagePreview className={'img-preview'}>
          {imageUrls?.map((image, idx) => (
            <img key={`big-img-${idx}`} src={image.src} />
          ))}
        </ImagePreview>
        <Content>
          <UserInfoBar />
          <textarea value={content} onChange={onChangeContent} autoFocus placeholder={'문구 입력...'} />
          <div className={'select-item'}>
            <input type={'text'} value={location} onChange={onChangeLocation} placeholder={'위치 추가'} />
            <span className={'icon'}>
              <IoLocationOutline />
            </span>
          </div>

          <SelectItem title={'접근성'} onClick={onClickApproach} show={showApproach} />
          <SelectItem title={'고급 설정'} onClick={onClickAdvanced} show={showAdvanced} />
          {showAdvanced && (
            <>
              <div className={'select-item-detail'}>
                <div className={'header'}>
                  <span className={'header__text'}>이 게시물의 좋아요 수 및 조회수 숨기기</span>
                  <SwitchButton value={hideCounts} setValue={setHideCounts} />
                </div>
                <p>
                  이 게시물의 총 좋아요 및 조회수는 회원님만 볼 수 있습니다. 나중에 게시물 상단에 있는 ··· 메뉴에서 이
                  설정을 변경할 수 있습니다. 다른 사람의 게시물에서 좋아요 수를 숨기려면 계정 설정으로 이동하세요.
                </p>
              </div>
              <div className={'select-item-detail'}>
                <div className={'header'}>
                  <span className={'header__text'}>댓글 기능 해제</span>
                  <SwitchButton value={turnOffComments} setValue={setTurnOffComments} />
                </div>
                <p>나중에 게시물 상단의 메뉴(···)에서 이 설정을 변경할 수 있습니다.</p>
              </div>
            </>
          )}
        </Content>
      </div>
    </Step>
  );
};

export default ThirdStep;
