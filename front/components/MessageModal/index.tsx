import React, { FC, useCallback } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
  keyword: string;
  [key: string]: any;
}

export const ModalContent = styled.div<{ [key: string]: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background-color: #fff;
  z-index: 1000;
  border-radius: 6px;

  & .text-container {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .big-text {
      font-size: 16px;
      font-weight: 600;
    }

    & .small-text {
      margin-top: 6px;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[600]};
    }
  }

  & .buttons {
    display: flex;
    flex-direction: column;

    & .button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      background-color: transparent;
      border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
      cursor: pointer;
      transition: 0.2s ease;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray[50]};
      }
    }
    & .delete-button {
      color: ${({ theme }) => theme.colors.red[600]};
    }
    & .cancel-button {
    }
  }
`;

const MessageModal: FC<IProps> = ({
  show,
  setShow,
  onCloseModal,
  keyword,
  content = '지금 나가면 수정 내용이 저장되지 않습니다.',
  setStep,
}) => {
  const theme = useTheme();

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <ModalContent>
        <div className={'text-container'}>
          <p className={'big-text'}>{keyword}을 삭제하시겠어요?</p>
          <p className={'small-text'}>{content}</p>
        </div>
        <div className={'buttons'}>
          <span className={'button delete-button'} onClick={onCloseModal}>
            삭제
          </span>
          <span className={'button cancel-button'} onClick={onClose}>
            취소
          </span>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
