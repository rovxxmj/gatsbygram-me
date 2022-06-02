import React, { createContext, Dispatch, FC, useCallback, useContext, useMemo, useRef, useState } from 'react';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}
import styled from '@emotion/styled';
import { Base } from '@components/Menu';
import Modal from '@components/Modal';
import { set } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import MessageModal from '@components/MakePostModal/MessageModal';
import { useRecoilState } from 'recoil';
import { isModalShow } from '@recoil/atoms';

export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 700px;
  height: 740px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .isContent {
    & .file-dropper {
      width: 800px;
      transition: 0.3s ease;
    }
  }
`;

export const Title = styled.div`
  height: 40px;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;

  > span {
    position: absolute;
    font-size: 14px;
    cursor: pointer;
  }

  > .prev {
    left: 20px;
  }

  > .next {
    right: 20px;
  }
`;

export const FileDropper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 400px;
  background-color: gray;
`;

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > label {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > p,
    span {
      transform: translateY(-40px);
    }
  }
`;

const MakePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [image, setImage] = useState('');
  const [showAddImage, setShowAddImage] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const { imagePaths } = useSelector((state: IState) => state.post); // 사진 미리보기
  const inputRef = useRef(null);
  const onChangeImage = useCallback((e: any) => {
    setImage(e.target.files[0]);
    setShowAddImage(true);
    onCloseModal();
    setImage('');
  }, []);

  const [isModalShowAtom, setIsModalShowAtom] = useRecoilState(isModalShow);
  const onCloseShowAddImage = useCallback(() => {}, []);

  const onCloseAddImageModal = useCallback(() => {
    setShowAddImage(false);
  }, []);

  const onClickPrev = useCallback(() => {
    // onCloseAddImageModal();
    // setIsModalShowAtom((prev) => !prev);
    // setShowMakePostModal(true);
    setIsModalShowAtom(true);
    onCloseAddImageModal();
  }, []);

  const onClickNext = useCallback(() => {
    setShowAddImage(false);
    setShowAddContent(true);
  }, []);

  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <ModalContentWrapper>
          <Title>새 게시물 만들기</Title>
          <FileDropper>
            <Form>
              <label>
                <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                <input hidden type={'file'} onChange={onChangeImage} value={image} ref={inputRef} />
              </label>
              <button type={'submit'}></button>
            </Form>
          </FileDropper>
        </ModalContentWrapper>
      </Modal>
      {/* AddImageModal + message */}
      <MessageModal
        show={showAddImage}
        onCloseModal={onCloseAddImageModal}
        title={'게시물을 삭제하시겠어요?'}
        subTitle={'지금 나가면 수정 내용이 저장되지 않습니다.'}
        accept={'삭제'}
        cancel={'취소'}
      >
        <ModalContentWrapper>
          <Title>
            <span
              className={'prev'}
              onClick={() => {
                setIsModalShowAtom(true);
                onCloseAddImageModal();
              }}
            >
              이전
            </span>
            게시물 올리기(default)
            <span
              className={'next'}
              onClick={() => {
                setShowAddImage(false);
                setShowAddContent(true);
              }}
            >
              다음
            </span>
          </Title>
          <FileDropper className={'file-dropper'}></FileDropper>
        </ModalContentWrapper>
      </MessageModal>
      {/* AddContentModal + message */}
      <MessageModal
        show={showAddContent}
        onCloseModal={() => setShowAddContent(false)}
        title={'게시물을 삭제하시겠어요?'}
        subTitle={'지금 나가면 수정 내용이 저장되지 않습니다.'}
        accept={'삭제'}
        cancel={'취소'}
      >
        <ModalContentWrapper className={'isContent'}>
          <Title>
            <span
              className={'prev'}
              onClick={() => {
                setShowAddContent(false);
                setShowAddImage(true);
              }}
            >
              이전
            </span>
            게시물 작성하기(final)
            <span className={'next'} onClick={() => console.log('submit')}>
              공유하기
            </span>
          </Title>
          <FileDropper>
            <ContentWrapper></ContentWrapper>
          </FileDropper>
        </ModalContentWrapper>
      </MessageModal>
    </>
  );
};

export default MakePostModal;
