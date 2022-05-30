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
  transform: translateY(-40px);
`;

const MakePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [image, setImage] = useState('');
  const { imagePaths } = useSelector((state: IState) => state.post); // 사진 미리보기
  const inputRef = useRef(null);
  const onChangeImage = useCallback((e: any) => {
    setImage(e.target.files[0]);
  }, []);

  // const onClickSelect = useCallback(() => {
  //   inputRef.current.click();
  // }, [inputRef.current]);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <ModalContentWrapper>
        <Title>새 게시물 만들기</Title>
        <FileDropper>
          <Form>
            <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
            <input type={'file'} onChange={onChangeImage} value={image} ref={inputRef} />
            {/*<button onClick={onClickSelect}>컴퓨터에서 선택</button>*/}
          </Form>
        </FileDropper>
      </ModalContentWrapper>
    </Modal>
  );
};

export default MakePostModal;
