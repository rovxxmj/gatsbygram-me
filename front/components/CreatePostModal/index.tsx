import React, { FC, useCallback, useState } from 'react';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import Step from '@components/CreatePostModal/Step';

interface IProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 760px;
  min-height: 720px;
  border-radius: 6px;
`;

const CreatePostModal: FC<IProps> = ({ show, onCloseModal }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showMessage, setShowMessage] = useState(false);
  const onShowMessage = useCallback(() => {
    setShowMessage(true);
  }, []);

  const onCloseMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onCloseModal={step !== 1 ? onShowMessage : onCloseModal}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <ModalContent>
          {step === 1 && (
            <Step title={'새 게시물 만들기'}>
              <div></div>
            </Step>
          )}
          {step === 2 && (
            <Step title={'편집하기'}>
              <div></div>
            </Step>
          )}
          {step === 3 && (
            <Step title={'작성하기'}>
              <div></div>
            </Step>
          )}
        </ModalContent>
      </Modal>
      <Modal show={showMessage} onCloseModal={onCloseMessage}>
        <div>Message</div>
      </Modal>
    </>
  );
};

export default CreatePostModal;
