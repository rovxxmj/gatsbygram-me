import React, { FC, useCallback, useRef, useState } from 'react';

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
`;

export const Title = styled.div`
  height: 40px;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
`;

export const FileDropper = styled.div`
  width: 100%;
  height: 100%;
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
  const { imagePaths } = useSelector((state: IState) => state.post); // 사진 미리보기
  const inputRef = useRef(null);
  const onChangeImage = useCallback((e: any) => {
    setImage(e.target.files[0]);
    setShowAddImage(true);
    onCloseModal();
  }, []);

  const onCloseModalInner = useCallback(() => {
    setShowAddImage(false);
  }, []);

  // const onClickSelect = useCallback(() => {
  //   inputRef.current.click();
  // }, [inputRef.current]);

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
            </Form>
          </FileDropper>
        </ModalContentWrapper>
      </Modal>
      <MessageModal
        show={showAddImage}
        onCloseModal={onCloseModalInner}
        title={'게시물을 삭제하시겠어요?'}
        subTitle={'지금 나가면 수정 내용이 저장되지 않습니다.'}
        accept={'삭제'}
        cancel={'취소'}
      >
        <ModalContentWrapper>
          <Title>게시물 올리기</Title>
          <FileDropper></FileDropper>
        </ModalContentWrapper>
      </MessageModal>
    </>
  );
};

export default MakePostModal;
